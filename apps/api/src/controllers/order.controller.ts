// Node Modules
import mongoose, { Types } from 'mongoose';

// Schemas
import Order from '@/models/order.model';
import Product from '@/models/product.model';
import Address from '@/models/address.model';
import Inventory from '@/models/inventory.model';

// Utils
import { formatDate } from '@/utils/common/date.util';
import { getOrderFiltersFromQuery } from '@/utils/order.utils';
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage, fillMissingDates } from '@/utils/common/date.util';
import { getPagination } from '@/utils/common/pagination.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type { Request, Response } from 'express';
import type {
  PlaceOrderSchema,
  GetUserOrdersSchema,
  GetUserOrderDetailsSchema,
  CancelOrderSchema,
  GetAllOrdersSchema,
  GetOrderDetailsAdminSchema,
  DeleteOrderSchema,
  UpdateOrderDetailsSchema,
  GetOrderStatsSchema,
  GetOrderRevenueStatsSchema,
  GetOrderStatusGraphDataSchema,
  GetOrderRevenueGraphDataSchema,
  GetRecentOrdersSchema,
} from '@/validators/order.validator';
import {
  OrderCancellationReason,
  OrderItem,
  OrderStatus,
} from '@repo/types/order';
import { OrderRevenueStats } from '@/types/order.types';
import { IInventory } from '@/models/interfaces/inventory.model';

/*********************** START: User Controllers ***********************/
export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id;
  const { items, shippingAddressId } = req.body as PlaceOrderSchema['body'];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const shippingAddress = shippingAddressId
      ? await Address.findOne({ _id: shippingAddressId, userId }).session(
          session,
        )
      : await Address.findOne({ userId, isDefault: true }).session(session);
    if (!shippingAddress) {
      throw new ErrorHandler(404, 'Shipping address not found', 'NOT_FOUND');
    }

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } })
      .lean()
      .session(session);
    const inventoryRecords = await Inventory.find({
      productId: { $in: productIds },
      quantity: { $gt: 0 },
    })
      .sort({ expirationDate: 1 }) // FIFO - use items expiring first
      .session(session);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];
    const inventoryUpdates: Array<{ _id: string; newQuantity: number }> = [];

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product) {
        throw new ErrorHandler(
          404,
          `Product not found: ${item.productId}`,
          'NOT_FOUND',
        );
      }

      if (!product.isActive) {
        throw new ErrorHandler(
          400,
          `Product not available: ${product.name}`,
          'BAD_REQUEST',
        );
      }

      const productInventory = inventoryRecords.filter(
        (inv) => inv.productId.toString() === item.productId,
      );

      const totalStock = productInventory.reduce(
        (sum, inv) => sum + inv.quantity,
        0,
      );

      if (totalStock < item.quantity) {
        throw new ErrorHandler(
          409,
          `Not enough stock for: ${product.name}. Available: ${totalStock}, Requested: ${item.quantity}`,
          'CONFLICT',
        );
      }

      const itemTotal = product.salePrice * item.quantity;

      orderItems.push({
        productId: product._id.toString(),
        quantity: item.quantity,
        price: product.salePrice,
        totalPrice: itemTotal,
      });

      totalAmount += itemTotal;

      // Deduct quantity from inventory using FIFO
      let remainingToDeduct = item.quantity;
      for (const inv of productInventory) {
        if (remainingToDeduct <= 0) break;

        const deductFromThis = Math.min(inv.quantity, remainingToDeduct);
        const newQuantity = inv.quantity - deductFromThis;

        inventoryUpdates.push({
          _id: (inv._id as Types.ObjectId).toString(),
          newQuantity,
        });

        remainingToDeduct -= deductFromThis;
      }
    }

    await Promise.all(
      inventoryUpdates.map((update) =>
        Inventory.findByIdAndUpdate(
          update._id,
          { quantity: update.newQuantity },
          { session },
        ),
      ),
    );

    const order = await Order.create(
      [
        {
          userId,
          items: orderItems,
          totalAmount,
          shippingAddress: shippingAddress._id,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    const populatedOrder = await Order.findById(order[0]?._id).populate([
      { path: 'items.productId', select: 'name images' },
      { path: 'userId', select: 'name email' },
      { path: 'shippingAddress' },
    ]);

    sendResponse(res, 201, 'Order placed successfully', {
      order: populatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ErrorHandler(500, 'Failed to place order', 'INTERNAL_SERVER');
  }
});

export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const query = req.query as GetUserOrdersSchema['query'];

    const { page, limit, skip } = getPagination(query.page, query.limit);

    const orders = await Order.find({ userId })
      .populate({
        path: 'items.productId',
        select: 'name images',
      })
      .populate('shippingAddress')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrderCount = await Order.countDocuments({ userId });

    sendResponse(res, 200, 'User orders fetched successfully', {
      orders,
      totalOrderCount,
      page,
      perPage: limit,
      totalPages: Math.ceil(totalOrderCount / limit),
    });
  },
);

export const getOrderDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { orderId } = req.params as GetUserOrderDetailsSchema['params'];

    const order = await Order.findById(orderId);
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    if (order.userId.toString() !== userId) {
      throw new ErrorHandler(
        403,
        'Not authorized to view this order',
        'UNAUTHORIZED',
      );
    }

    await order.populate([
      { path: 'items.productId', select: 'name images' },
      { path: 'userId', select: 'name email' },
      { path: 'shippingAddress' },
    ]);

    sendResponse(res, 200, 'Order details fetched successfully', { order });
  },
);

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id;
  const { orderId } = req.params as CancelOrderSchema['params'];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).session(session);
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    if (order.userId.toString() !== userId) {
      throw new ErrorHandler(
        403,
        'Not authorized to cancel this order',
        'UNAUTHORIZED',
      );
    }

    if (
      ![OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(
        order.status as OrderStatus,
      )
    ) {
      throw new ErrorHandler(
        400,
        'Order cannot be cancelled in current status',
        'BAD_REQUEST',
      );
    }

    const productIds = order.items.map((i) => i.productId);

    const [inventoryRecords] = await Promise.all([
      Inventory.find({
        productId: { $in: productIds },
        quantity: { $gt: 0 },
      })
        .sort({ expirationDate: 1 }) // FIFO
        .session(session),
    ]);

    const inventoryMap = new Map<string, IInventory>();
    for (const inventory of inventoryRecords) {
      inventoryMap.set(inventory.productId.toString(), inventory);
    }

    const inventoryOperations: Array<{
      _id: Types.ObjectId;
      quantity: number;
    }> = [];

    for (const item of order.items) {
      let quantityToRestore = item.quantity;
      const productInventory =
        inventoryMap.get(item.productId.toString()) || [];

      for (const record of productInventory as IInventory[]) {
        if (quantityToRestore <= 0) break;

        const restoreAmount = Math.min(quantityToRestore, record.quantity); // Prevent over-increment
        inventoryOperations.push({
          _id: record._id as Types.ObjectId,
          quantity: restoreAmount,
        });

        quantityToRestore -= restoreAmount;
      }
    }

    await Promise.all(
      inventoryOperations.map((operation) =>
        Inventory.findByIdAndUpdate(
          operation._id,
          { quantity: operation.quantity },
          { session },
        ),
      ),
    );

    order.status = OrderStatus.CANCELLED;
    order.cancellationReason = OrderCancellationReason.CUSTOMER_CANCELLED;
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    const populatedOrder = await Order.findById(orderId).populate([
      { path: 'items.productId', select: 'name' },
      { path: 'userId', select: 'name email' },
      { path: 'shippingAddress' },
    ]);

    sendResponse(res, 200, 'Order cancelled successfully', {
      order: populatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ErrorHandler(500, 'Failed to cancel order', 'INTERNAL_SERVER');
  }
});
/****************** END: User Controllers ********************/

/****************** START: Admin Controllers ********************/
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetAllOrdersSchema['query'];

    const { queryObject, sortObject, perPage, currentPage, skip } =
      await getOrderFiltersFromQuery(query);

    const orders = await Order.find(queryObject)
      .populate('userId', 'name email phone userType')
      .populate({
        path: 'items.productId',
        select: 'name category images',
      })
      .populate('shippingAddress')
      .sort(sortObject)
      .skip(skip)
      .limit(perPage);

    const totalOrders = await Order.countDocuments(queryObject);

    sendResponse(res, 200, 'Orders fetched successfully', {
      orders,
      totalOrders,
      currentPage,
      perPage,
      totalPages: Math.ceil(totalOrders / perPage),
    });
  },
);

export const getOrderDetailsAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as GetOrderDetailsAdminSchema['params'];

    const order = await Order.findById(orderId)
      .populate('userId', 'name email phone userType')
      .populate({
        path: 'items.productId',
        select: 'name category images description',
      })
      .populate('shippingAddress');

    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Order details fetched successfully', { order });
  },
);

export const getOrderStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const totalOrders = await Order.countDocuments(matchStage);
    const pendingOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.PENDING,
    });
    const confirmedOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.CONFIRMED,
    });
    const shippedOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.SHIPPED,
    });
    const deliveredOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.DELIVERED,
    });
    const cancelledOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.CANCELLED,
    });

    sendResponse(res, 200, 'Order stats fetched successfully', {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    });
  },
);

export const getOrderRevenueStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderRevenueStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const [revenueStats] = await Order.aggregate<OrderRevenueStats>([
      {
        $match: matchStage,
      },
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $addFields: {
          revenue: {
            $multiply: ['$items.price', '$items.quantity'],
          },
          cost: {
            $multiply: ['$productInfo.costPrice', '$items.quantity'],
          },
        },
      },
      {
        $addFields: {
          profit: { $subtract: ['$revenue', '$cost'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
          totalCost: { $sum: '$cost' },
          totalProfit: { $sum: '$profit' },
        },
      },
    ]);

    if (!revenueStats) {
      throw new ErrorHandler(404, 'No revenue stats found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Order revenue stats fetched successfully', {
      totalRevenue: revenueStats.totalRevenue,
      totalCost: revenueStats.totalCost,
      totalProfit: revenueStats.totalProfit,
    });
  },
);

export const getOrderStatusGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderStatusGraphDataSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const statusData = await Order.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          statuses: {
            $push: {
              status: '$_id.status',
              count: '$count',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          statuses: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const formattedData = statusData.map((item) => {
      const statusCounts = Object.values(OrderStatus).reduce(
        (acc, status) => {
          acc[status] = 0;
          return acc;
        },
        {} as Record<string, number>,
      );

      item.statuses.forEach((status: { status: string; count: number }) => {
        statusCounts[status.status] = status.count;
      });

      return {
        date: formatDate(item.date),
        ...statusCounts,
      };
    });

    sendResponse(res, 200, 'Order status graph data fetched successfully', {
      data: formattedData,
    });
  },
);

export const getOrderRevenueGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderRevenueGraphDataSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const revenueData = await Order.aggregate([
      {
        $match: matchStage,
      },
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $addFields: {
          revenue: {
            $multiply: ['$items.price', '$items.quantity'],
          },
          cost: {
            $multiply: ['$productInfo.costPrice', '$items.quantity'],
          },
          profit: {
            $subtract: [
              { $multiply: ['$items.price', '$items.quantity'] },
              { $multiply: ['$productInfo.costPrice', '$items.quantity'] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orderId: '$_id',
          },
          revenue: { $sum: '$revenue' },
          cost: { $sum: '$cost' },
          profit: { $sum: '$profit' },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          orderCount: { $sum: 1 },
          totalRevenue: { $sum: '$revenue' },
          totalCost: { $sum: '$cost' },
          totalProfit: { $sum: '$profit' },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          orderCount: 1,
          totalRevenue: 1,
          totalCost: 1,
          totalProfit: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const completeData = fillMissingDates(revenueData, from, to, 30, 'date', [
      'orderCount',
      'totalRevenue',
      'totalCost',
      'totalProfit',
    ]);

    sendResponse(res, 200, 'Order revenue graph data fetched successfully', {
      data: completeData,
    });
  },
);

export const getRecentOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to, limit } = req.query as GetRecentOrdersSchema['query'];

    const limitNumber = parseInt(limit ?? '10', 10);
    const matchStage = getDateMatchStage('createdAt', from, to);

    const orders = await Order.aggregate([
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $limit: limitNumber },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          itemsCount: { $size: '$items' },
          'user.name': 1,
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    sendResponse(res, 200, 'Recent orders fetched successfully', { orders });
  },
);
/****************** END: Admin Controllers ********************/
