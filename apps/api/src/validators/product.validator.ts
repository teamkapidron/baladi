import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { dateSchema } from './schemas/date.schema';
import { productSchema } from './schemas/product.schema';
import { ProductStock } from '@/types/product.types';
import { Visibility } from '@repo/types/product';

/******************* START: User Validators *******************/
export const getProductsSchema = z.object({
  query: z
    .object({
      search: z.string().optional(),
      page: z.string().optional(),
      limit: z.string().optional(),
      category: z.string().optional(),
      minPrice: z.string().optional(),
      maxPrice: z.string().optional(),
      stock: z.nativeEnum(ProductStock).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.minPrice && data.maxPrice) {
        if (parseInt(data.minPrice, 10) > parseInt(data.maxPrice, 10)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Min price cannot be greater than max price',
            path: ['minPrice'],
          });
        }
      }
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
    query: z.string().optional(),
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
    isActive: z.enum(['true', 'false']).optional(),
    visibility: z.string().optional(),
  }),
});

export const getProductImageUploadUrlSchema = z.object({
  body: z.object({
    slug: z.string().min(1, 'Product slug is required'),
    names: z.array(z.string()).min(1, 'Names are required'),
    imageCount: z.number().min(1, 'Image count is required'),
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

export const bulkAddProductsSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        name: z.string().trim().min(1, 'Name is required'),
        description: z.string().optional().default(''),
        shortDescription: z.string().optional().default(''),
        sku: z.string().optional().default(''),
        barcode: z.string().optional().default(''),
        vat: z
          .string()
          .trim()
          .refine((val) => val !== '', 'VAT is required')
          .refine(
            (val) => !isNaN(parseFloat(val)),
            'VAT must be a valid number',
          )
          .refine((val) => {
            const num = parseFloat(val);
            return num >= 0 && num <= 100;
          }, 'VAT must be between 0 and 100')
          .transform((val) => parseFloat(val)),
        costPrice: z
          .string()
          .trim()
          .refine((val) => val !== '', 'Cost price is required')
          .refine(
            (val) => !isNaN(parseFloat(val)),
            'Cost price must be a valid number',
          )
          .refine((val) => parseFloat(val) >= 0, 'Cost price must be positive')
          .transform((val) => parseFloat(val)),
        salePrice: z
          .string()
          .trim()
          .refine((val) => val !== '', 'Sale price is required')
          .refine(
            (val) => !isNaN(parseFloat(val)),
            'Sale price must be a valid number',
          )
          .refine((val) => parseFloat(val) >= 0, 'Sale price must be positive')
          .transform((val) => parseFloat(val)),
        noOfUnits: z
          .string()
          .trim()
          .refine((val) => val !== '', 'Number of units is required')
          .refine(
            (val) => !isNaN(parseInt(val)),
            'Number of units must be a valid number',
          )
          .refine(
            (val) => parseInt(val) >= 0,
            'Number of units must be positive',
          )
          .transform((val) => parseInt(val)),
        categories: z
          .string()
          .optional()
          .default('')
          .transform((val) =>
            val
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          ),

        images: z
          .string()
          .optional()
          .default('')
          .transform((val) =>
            val
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          ),
        isActive: z
          .string()
          .trim()
          .refine((val) => val !== '', 'Active status is required')
          .refine((val) => {
            const lower = val.toLowerCase();
            return ['true', 'false', '1', '0', 'ja', 'nei'].includes(lower);
          }, 'Active status must be true/false, 1/0, or ja/nei')
          .transform((val) => ['true', '1', 'ja'].includes(val.toLowerCase())),
        visibility: z
          .string()
          .trim()
          .refine((val) => val !== '', 'Visibility is required')
          .refine((val) => {
            const lower = val.toLowerCase();
            return [
              'both',
              'begge',
              'internal',
              'intern',
              'external',
              'ekstern',
            ].includes(lower);
          }, 'Visibility must be: both/begge, internal/intern, or external/ekstern')
          .transform((val) => {
            const lower = val.toLowerCase();
            if (lower === 'both' || lower === 'begge') return Visibility.BOTH;
            if (lower === 'internal' || lower === 'intern')
              return Visibility.INTERNAL;
            return Visibility.EXTERNAL;
          }),
        hasVolumeDiscount: z
          .string()
          .optional()
          .refine((val) => {
            if (!val || val.trim() === '') return true;
            const lower = val.toLowerCase();
            return ['true', 'false', '1', '0', 'ja', 'nei'].includes(lower);
          }, 'Volume discount must be true/false, 1/0, or ja/nei')
          .transform((val) => {
            if (!val || val.trim() === '') return false;
            return ['true', '1', 'ja'].includes(val.toLowerCase());
          })
          .default('false'),
        weight: z
          .string()
          .optional()
          .refine((val) => {
            if (!val || val.trim() === '') return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= 0;
          }, 'Weight must be a valid and positive number')
          .transform((val) =>
            val && val.trim() !== '' ? parseFloat(val) : undefined,
          ),
        'dimensions.length': z
          .string()
          .optional()
          .refine((val) => {
            if (!val || val.trim() === '') return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= 0;
          }, 'Length must be a valid and positive number')
          .transform((val) =>
            val && val.trim() !== '' ? parseFloat(val) : undefined,
          ),
        'dimensions.width': z
          .string()
          .optional()
          .refine((val) => {
            if (!val || val.trim() === '') return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= 0;
          }, 'Width must be a valid and positive number')
          .transform((val) =>
            val && val.trim() !== '' ? parseFloat(val) : undefined,
          ),
        'dimensions.height': z
          .string()
          .optional()
          .refine((val) => {
            if (!val || val.trim() === '') return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= 0;
          }, 'Height must be a valid and positive number')
          .transform((val) =>
            val && val.trim() !== '' ? parseFloat(val) : undefined,
          ),
        'supplier.number': z.string().optional().default(''),
        'supplier.name': z.string().optional().default(''),
        'supplier.location': z.string().optional().default(''),
        'supplier.countryOfOrigin': z.string().optional().default(''),
        'supplier.hsCode': z.string().optional().default(''),
      }),
    ),
  }),
});

export const productStatsSchema = z.object({});

export type GetAllProductsSchema = z.infer<typeof getAllProductsSchema>;
export type GetProductImageUploadUrlSchema = z.infer<
  typeof getProductImageUploadUrlSchema
>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
export type LowStockProductsSchema = z.infer<typeof lowStockProductsSchema>;
export type TopProductsSchema = z.infer<typeof topProductsSchema>;
export type ProductStatsSchema = z.infer<typeof productStatsSchema>;
export type BulkAddProductsSchema = z.infer<typeof bulkAddProductsSchema>;
/******************* END: Admin Validators *******************/
