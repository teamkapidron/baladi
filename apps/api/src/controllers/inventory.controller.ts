// Node Modules
import { PipelineStage } from 'mongoose';

// Schemas
import Product from '@/models/product.model';
import Inventory from '@/models/inventory.model';

// Utils
import { getDurationInMs } from '@/utils/common/date.util';
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage } from '@/utils/common/date.util';
import { getPagination } from '@/utils/common/pagination.utils';
import { buildStockCountPipeline } from '@/utils/inventory.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  GetAllInventorySchema,
  GetProductInventorySchema,
  CreateInventorySchema,
  InventoryStatsSchema,
} from '@/validators/inventory.validator';
import type { Request, Response } from 'express';

export const getAllInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetAllInventorySchema['query'];

    const { page, limit, skip } = getPagination(query.page, query.limit);

    const inventory = await Inventory.find()
      .populate('productId', 'name sku category price')
      .skip(skip)
      .limit(limit);

    const totalInventory = await Inventory.countDocuments();

    sendResponse(res, 200, 'Inventory fetched successfully', {
      inventory,
      totalInventory,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalInventory / limit),
    });
  },
);

export const getProductInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetProductInventorySchema['query'];
    const { productId } = req.params as GetProductInventorySchema['params'];

    const { page, limit, skip } = getPagination(query.page, query.limit);

    const inventory = await Inventory.find({ productId })
      .populate('productId', 'name sku category price')
      .skip(skip)
      .limit(limit)
      .sort({
        expirationDate: 1,
      });

    const totalInventory = await Inventory.countDocuments({ productId });

    sendResponse(res, 200, 'Inventory fetched successfully', {
      inventory,
      totalInventory,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalInventory / limit),
    });
  },
);

export const createInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params as CreateInventorySchema['params'];
    const { quantity, expirationDate } =
      req.body as CreateInventorySchema['body'];

    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    const expiryDate = new Date(expirationDate);

    const inventory = await Inventory.create({
      productId,
      quantity,
      expirationDate: expiryDate,
    });

    sendResponse(res, 201, 'Inventory created successfully', {
      inventory,
    });
  },
);

export const getInventoryStats = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as InventoryStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', query.from, query.to);

    const totalInventoryValuePipeline: PipelineStage[] = [
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ];

    const [[outOfStockCount], [lowStockCount], [totalValue]] =
      await Promise.all([
        Product.aggregate(buildStockCountPipeline(0)),
        Product.aggregate(buildStockCountPipeline(5)),
        Inventory.aggregate(totalInventoryValuePipeline),
      ]);

    sendResponse(res, 200, 'Inventory stats fetched successfully', {
      outOfStockCount: outOfStockCount?.count ?? 0,
      lowStockCount: lowStockCount?.count ?? 0,
      totalInventoryValue: totalValue?.totalValue ?? 0,
    });
  },
);
