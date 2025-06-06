// Node Modules
import mongoose from 'mongoose';

// Schemas
import Order from '@/models/order.model';
import Product from '@/models/product.model';
import Address from '@/models/address.model';

// Utils
import { formatDate } from '@/utils/common/date.util';
import { getOrderFiltersFromQuery } from '@/utils/order.utils';
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage } from '@/utils/common/date.util';
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
} from '@/validators/order.validator';
import { OrderItem, OrderStatus } from '@repo/types/order';
import { OrderRevenueStats } from '@/types/order.types';
import { ErrorName } from '@/types/common/error.types';

/****************** START: User Controllers ********************/
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

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

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

      if (product.stock < item.quantity) {
        throw new ErrorHandler(
          409,
          `Not enough stock for: ${product.name}`,
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
      product.stock -= item.quantity;
    }

    await Promise.all(products.map((p) => p.save({ session })));

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
      { path: 'items.productId', select: 'name salePrice stock' },
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
        select: 'name salePrice stock images',
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
      { path: 'items.productId', select: 'name salePrice stock images' },
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
    const products = await Product.find({ _id: { $in: productIds } })
      .session(session)
      .lean();

    for (const item of order.items) {
      const product = products.find(
        (p) => p._id.toString() === item.productId.toString(),
      );
      if (product) {
        product.stock += item.quantity;
        await product.save({ session });
      }
    }

    order.status = OrderStatus.CANCELLED;
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    const populatedOrder = await Order.findById(orderId).populate([
      { path: 'items.productId', select: 'name salePrice stock' },
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
      .populate('userID', 'name email phone userType')
      .populate({
        path: 'items.productID',
        select: 'name salePrice stock category images',
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
        path: 'items.productID',
        select: 'name salePrice stock category images description',
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
/****************** END: Admin Controllers ********************/
