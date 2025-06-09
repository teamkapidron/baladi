// Node Modules

// Schemas
import Discount from '@/models/discount.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  CreateDiscountSchema,
  UpdateDiscountSchema,
  MakeDiscountInactiveSchema,
} from '@/validators/discount.validator';
import type { Request, Response } from 'express';

export const getDiscounts = asyncHandler(async (_: Request, res: Response) => {
  const discounts = await Discount.find();
  sendResponse(res, 200, 'Discounts fetched successfully', {
    discounts,
  });
});

export const createDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, discountValue, validFrom, validTo } =
      req.body as CreateDiscountSchema['body'];

    const discount = await Discount.create({
      productId,
      discountValue,
      validFrom,
      validTo,
    });

    sendResponse(res, 201, 'Discount created successfully', {
      discount,
    });
  },
);

export const updateDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const { discountId } = req.params as UpdateDiscountSchema['params'];
    const { discountValue, validFrom, validTo } =
      req.body as UpdateDiscountSchema['body'];

    const discount = await Discount.findByIdAndUpdate(discountId, {
      discountValue,
      validFrom,
      validTo,
    });

    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Discount updated successfully', {
      discount,
    });
  },
);

export const makeDiscountInactive = asyncHandler(
  async (req: Request, res: Response) => {
    const { discountId } = req.params as MakeDiscountInactiveSchema['params'];
    await Discount.findByIdAndUpdate(discountId, {
      isActive: false,
    });

    sendResponse(res, 200, 'Discount made inactive successfully');
  },
);
