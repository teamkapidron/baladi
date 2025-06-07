import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { dateSchema } from './schemas/date.schema';
import { productSchema } from './schemas/product.schema';

/******************* START: User Validators *******************/
export const getProductsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    productId: z.string().min(1, 'Product ID is required'),
  }),
});

export const getProductBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Product slug is required'),
  }),
});

export const quickSearchProductsSchema = z.object({
  query: z.object({
    query: z.string().min(1, 'Search query is required'),
    limit: z.string().optional(),
  }),
});

export const fullSearchProductsSchema = z.object({
  query: z.object({
    query: z.string().min(1, 'Search query is required'),
    page: z.string().optional(),
    limit: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  }),
});

export type GetProductsSchema = z.infer<typeof getProductsSchema>;
export type GetProductByIdSchema = z.infer<typeof getProductByIdSchema>;
export type GetProductBySlugSchema = z.infer<typeof getProductBySlugSchema>;
export type QuickSearchProductsSchema = z.infer<
  typeof quickSearchProductsSchema
>;
export type FullSearchProductsSchema = z.infer<typeof fullSearchProductsSchema>;
/******************* END: User Validators *******************/

/******************* START: Admin Validators *******************/
export const getAllProductsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    isActive: z.enum(['true', 'false']).optional(),
    visibility: z.string().optional(),
  }),
});

export const createProductSchema = z.object({
  body: productSchema,
});

export const updateProductSchema = z.object({
  params: z.object({
    productId: z
      .string()
      .min(1, 'Product ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid product ID format',
      }),
  }),
  body: productSchema,
});

export const deleteProductSchema = z.object({
  params: z.object({
    productId: z
      .string()
      .min(1, 'Product ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid product ID format',
      }),
  }),
});

export const lowStockProductsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    lowStockThreshold: z.string().optional(),
  }),
});

export const topProductsSchema = z.object({
  query: z
    .object({
      limit: z.string().optional(),
      from: dateSchema,
      to: dateSchema,
    })
    .superRefine((data, ctx) => {
      if (data.from && data.to) {
        const fromDate = new Date(data.from);
        const toDate = new Date(data.to);
        if (fromDate > toDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'From date cannot be after to date',
            path: ['from'],
          });
        }
      }
    }),
});

export type GetAllProductsSchema = z.infer<typeof getAllProductsSchema>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
export type LowStockProductsSchema = z.infer<typeof lowStockProductsSchema>;
export type TopProductsSchema = z.infer<typeof topProductsSchema>;
/******************* END: Admin Validators *******************/
