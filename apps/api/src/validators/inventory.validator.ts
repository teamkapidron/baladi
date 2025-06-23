import { z } from 'zod';
import { dateSchema } from './schemas/date.schema';

import { InventoryStatus } from '@/types/inventory.types';

export const getAllInventorySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    status: z.nativeEnum(InventoryStatus).optional(),
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
  params: z.object({}),
  body: z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(1, 'Quantity must be greater than 0'),
    expirationDate: z.string().min(1, 'Expiration date is required'),
  }),
});

export const inventoryStatsSchema = z.object({
  query: z.object({
    from: dateSchema,
    to: dateSchema,
  }),
});

export const bulkAddInventorySchema = z.object({
  body: z.object({
    inventory: z.array(
      z.object({
        name: z.string().trim().min(1, 'Name is required'),
        slug: z.string().trim().min(1, 'Slug is required'),
        quantity: z
          .string()
          .trim()
          .refine((val) => val !== '', 'Quantity is required')
          .refine(
            (val) => !isNaN(parseInt(val)),
            'Quantity must be a valid number',
          )
          .transform((val) => parseInt(val)),
        expirationDate: z
          .string()
          .trim()
          .transform((val) => {
            const timestamp = new Date(val).getTime();
            return isNaN(timestamp) ? NaN : timestamp;
          })
          .refine((val) => !isNaN(val), 'Expiration date is required'),
      }),
    ),
  }),
});

export type BulkAddInventorySchema = z.infer<typeof bulkAddInventorySchema>;

export type GetAllInventorySchema = z.infer<typeof getAllInventorySchema>;
export type GetProductInventorySchema = z.infer<
  typeof getProductInventorySchema
>;
export type CreateInventorySchema = z.infer<typeof createInventorySchema>;
export type InventoryStatsSchema = z.infer<typeof inventoryStatsSchema>;
