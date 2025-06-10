import { z } from 'zod';

// Resource reference schema
export const resourceRefSchema = z
  .object({
    id: z.number(),
  })
  .nullable()
  .optional();

// Product schema
export const productSchema = z.object({
  id: z.number(),
  version: z.number().nullable().optional(),
  name: z.string(),
  number: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  ean: z.string().nullable().optional(),
  elNumber: z.string().nullable().optional(),
  nrfNumber: z.string().nullable().optional(),
  costExcludingVatCurrency: z.number().nullable().optional(),
  priceExcludingVatCurrency: z.number().nullable().optional(),
  priceIncludingVatCurrency: z.number().nullable().optional(),
  isInactive: z.boolean(),
  unitOfMeasure: resourceRefSchema,
  isStockItem: z.boolean(),
  stockOfGoods: z.number().nullable().optional(),
  vatType: resourceRefSchema,
  currency: resourceRefSchema,
  discountGroup: resourceRefSchema,
  account: resourceRefSchema,
  productGroup: resourceRefSchema,
  category: resourceRefSchema,
  hsCode: z.string().nullable().optional(),
  alternativeName: z.string().nullable().optional(),
  resaleProduct: resourceRefSchema,
  weight: z.number().nullable().optional(),
  weightUnit: z.enum(['kg', 'g', 'hg']).nullable().optional(),
  volume: z.number().nullable().optional(),
  volumeUnit: z.enum(['l', 'dl', 'cl', 'ml']).nullable().optional(),
  supplierProductNumber: z.string().nullable().optional(),
  supplier: resourceRefSchema,
});

export type Product = z.infer<typeof productSchema>;

// Create product input schema
export const createProductInputSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  number: z.string().optional(),
  description: z.string().optional(),
  ean: z.string().optional(),
  elNumber: z.string().optional(),
  nrfNumber: z.string().optional(),
  costExcludingVatCurrency: z.number().optional(),
  priceExcludingVatCurrency: z.number().optional(),
  priceIncludingVatCurrency: z.number().optional(),
  isInactive: z.boolean().default(false),
  unitOfMeasureId: z.number().optional(),
  isStockItem: z.boolean().default(false),
  stockOfGoods: z.number().optional(),
  vatTypeId: z.number().optional(),
  currencyId: z.number().optional(),
  discountGroupId: z.number().optional(),
  accountId: z.number().optional(),
  productGroupId: z.number().optional(),
  categoryId: z.number().optional(),
  hsCode: z.string().optional(),
  alternativeName: z.string().optional(),
  resaleProductId: z.number().optional(),
  weight: z.number().optional(),
  weightUnit: z.enum(['kg', 'g', 'hg']).optional(),
  volume: z.number().optional(),
  volumeUnit: z.enum(['l', 'dl', 'cl', 'ml']).optional(),
  supplierProductNumber: z.string().optional(),
  supplierId: z.number().optional(),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

// List products response schema
export const listProductsResponseSchema = z.object({
  from: z.number(),
  count: z.number(),
  versionDigest: z.string().nullable().optional(),
  values: z.array(productSchema),
});

export type ListProductsResponse = z.infer<typeof listProductsResponseSchema>;

// Create product response schema
export const createProductResponseSchema = z.object({
  value: productSchema,
});

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;

// Create product result (just the ID)
export const createProductResultSchema = z.object({
  productId: z.number(),
});

export type CreateProductResult = z.infer<typeof createProductResultSchema>;
