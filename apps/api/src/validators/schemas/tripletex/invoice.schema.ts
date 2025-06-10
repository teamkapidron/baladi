import { z } from 'zod';

// Resource reference schema
export const resourceRefSchema = z
  .object({
    id: z.number(),
  })
  .nullable()
  .optional();

// Invoice schema
export const invoiceSchema = z.object({
  id: z.number(),
  version: z.number().nullable().optional(),
  invoiceNumber: z.number(),
  invoiceDate: z.string(),
  customer: resourceRefSchema,
  creditedInvoice: resourceRefSchema,
  isCredited: z.boolean(),
  invoiceDueDate: z.string(),
  kid: z.string().nullable().optional(),
  invoiceComment: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  orders: z.array(resourceRefSchema).nullable().optional(),
  orderLines: z.array(resourceRefSchema).nullable().optional(),
  travelReports: z.array(resourceRefSchema).nullable().optional(),
  project: resourceRefSchema,
  invoiceRemarks: z.string().nullable().optional(),
  invoiceReceiver: z.string().nullable().optional(),
  invoiceType: z.string().nullable().optional(),
  totalInvoiceAmountCurrency: z.number().nullable().optional(),
  totalInvoiceAmountIncludingVatCurrency: z.number().nullable().optional(),
  totalAmountCurrency: z.number().nullable().optional(),
  currency: resourceRefSchema,
  invoice: resourceRefSchema,
  deliveryDate: z.string().nullable().optional(),
  vatSpecification: z.any().nullable().optional(),
  sumRemaining: z.number().nullable().optional(),
  sumRemainingCurrency: z.number().nullable().optional(),
  ehfSendStatus: z.string().nullable().optional(),
});

export type Invoice = z.infer<typeof invoiceSchema>;

// Create invoice input schema
export const createInvoiceInputSchema = z.object({
  invoiceDate: z.string().optional(), // Will default to today if not provided
  customerId: z.number().min(1, 'Customer ID is required'),
  invoiceDueDate: z.string().optional(), // Will be calculated based on customer settings if not provided
  kid: z.string().optional(),
  invoiceComment: z.string().optional(),
  comment: z.string().optional(),
  orderIds: z.array(z.number()).optional(),
  projectId: z.number().optional(),
  invoiceRemarks: z.string().optional(),
  invoiceReceiver: z.string().optional(),
  invoiceType: z.string().optional(),
  currencyId: z.number().optional(),
  deliveryDate: z.string().optional(),

  sendToCustomer: z.boolean().default(false),
  // Options for creating from order
  orderId: z.number().optional(), // Single order ID for convenience
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceInputSchema>;

// List invoices response schema
export const listInvoicesResponseSchema = z.object({
  from: z.number(),
  count: z.number(),
  versionDigest: z.string().nullable().optional(),
  values: z.array(invoiceSchema),
});

export type ListInvoicesResponse = z.infer<typeof listInvoicesResponseSchema>;

// Create invoice response schema
export const createInvoiceResponseSchema = z.object({
  value: invoiceSchema,
});

export type CreateInvoiceResponse = z.infer<typeof createInvoiceResponseSchema>;

// Create invoice result (just the ID)
export const createInvoiceResultSchema = z.object({
  invoiceId: z.number(),
});

export type CreateInvoiceResult = z.infer<typeof createInvoiceResultSchema>;

// Invoice PDF response schema
export const invoicePdfResponseSchema = z.object({
  url: z.string(),
  filename: z.string().optional(),
});

export type InvoicePdfResponse = z.infer<typeof invoicePdfResponseSchema>;

// View invoice result (with URL)
export const viewInvoiceResultSchema = z.object({
  invoiceUrl: z.string(),
  invoiceId: z.number(),
  invoiceNumber: z.number(),
});

export type ViewInvoiceResult = z.infer<typeof viewInvoiceResultSchema>;
