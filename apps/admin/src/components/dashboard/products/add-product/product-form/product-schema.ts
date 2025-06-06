import { z } from '@repo/ui/lib/form';

export const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters' }),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  vat: z.number().min(0),
  costPrice: z.number().min(0),
  cartonPrice: z.number().min(0).optional(),
  unitPrice: z.number().min(0).optional(),
  salePrice: z.number().min(0),
  stock: z.number().min(0),
  unitsPerCarton: z.number().min(0).optional(),
  categoryID: z.string().optional(),
  isActive: z.boolean().default(true),
  visibility: z.enum(['both', 'internal', 'external']),
  weight: z.union([z.string(), z.number()]).optional(),
  shelfLife: z
    .object({
      duration: z.number().optional(),
      unit: z.enum(['days', 'months', 'years']).optional(),
    })
    .optional(),
  dimensions: z
    .object({
      length: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
