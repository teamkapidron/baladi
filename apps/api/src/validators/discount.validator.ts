import { z } from 'zod';

export const getActiveBulkDiscountsSchema = z.object({});

export const getDiscountsSchema = z.object({});

export const getBulkDiscountsSchema = z.object({});

export const createDiscountSchema = z.object({
  body: z.object({
    productId: z.string().min(1, 'Product ID is required'),
    discountValue: z.number().min(0, 'Discount value must be greater than 0'),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
  }),
});

export const createBulkDiscountSchema = z.object({
  body: z.object({
    minQuantity: z.number().min(1, 'Minimum quantity must be greater than 0'),
    discountPercentage: z
      .number()
      .min(0, 'Discount percentage must be greater than 0'),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
  }),
});

export const updateDiscountSchema = z.object({
  body: z.object({
    discountValue: z.number().min(0, 'Discount value must be greater than 0'),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
  }),
  params: z.object({
    discountId: z.string().min(1, 'Discount ID is required'),
  }),
});

export const makeDiscountInactiveSchema = z.object({
  params: z.object({
    discountId: z.string().min(1, 'Discount ID is required'),
  }),
});

export type GetDiscountsSchema = z.infer<typeof getDiscountsSchema>;
export type GetBulkDiscountsSchema = z.infer<typeof getBulkDiscountsSchema>;
export type CreateDiscountSchema = z.infer<typeof createDiscountSchema>;
export type CreateBulkDiscountSchema = z.infer<typeof createBulkDiscountSchema>;
export type UpdateDiscountSchema = z.infer<typeof updateDiscountSchema>;
export type MakeDiscountInactiveSchema = z.infer<
  typeof makeDiscountInactiveSchema
>;
