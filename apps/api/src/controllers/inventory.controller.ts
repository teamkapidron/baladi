// Node Modules

// Schemas
import Product from '@/models/product.model';
import Inventory from '@/models/inventory.model';

// Utils
import { getDurationInMs } from '@/utils/common/date.util';
import { sendResponse } from '@/utils/common/response.util';
import { getPagination } from '@/utils/common/pagination.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  GetAllInventorySchema,
  GetProductInventorySchema,
  CreateInventorySchema,
} from '@/validators/inventory.validator';
import type { Request, Response } from 'express';

export const getAllInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetAllInventorySchema['query'];

    const { page, limit, skip } = getPagination(query.page, query.limit);

    const inventory = await Inventory.find().skip(skip).limit(limit);

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
    const { quantity, shelfLife } = req.body as CreateInventorySchema['body'];

    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    const expirationDate = new Date(
      new Date().getTime() +
        shelfLife.duration * getDurationInMs(shelfLife.unit),
    );

    const inventory = await Inventory.create({
      productId,
      quantity,
      shelfLife,
      expirationDate,
    });

    sendResponse(res, 201, 'Inventory created successfully', {
      inventory,
    });
  },
);
