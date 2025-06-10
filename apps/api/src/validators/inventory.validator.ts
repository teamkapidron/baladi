import { z } from 'zod';
import { dateSchema } from './schemas/date.schema';

export const getAllInventorySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getProductInventorySchema = z.object({
  params: z.object({
    productId: z.string().min(1, 'Product ID is required'),
  }),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const createInventorySchema = z.object({
  params: z.object({
    productId: z.string().min(1, 'Product ID is required'),
  }),
  body: z.object({
    quantity: z.number().min(1, 'Quantity must be greater than 0'),
    expirationDate: dateSchema.unwrap(),
  }),
});

export const inventoryStatsSchema = z.object({
  query: z.object({
    from: dateSchema,
    to: dateSchema,
  }),
});

export type GetAllInventorySchema = z.infer<typeof getAllInventorySchema>;
export type GetProductInventorySchema = z.infer<
  typeof getProductInventorySchema
>;
export type CreateInventorySchema = z.infer<typeof createInventorySchema>;
export type InventoryStatsSchema = z.infer<typeof inventoryStatsSchema>;
