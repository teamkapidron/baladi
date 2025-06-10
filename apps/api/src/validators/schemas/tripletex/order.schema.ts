import { z } from 'zod';

// Resource reference schema
export const resourceRefSchema = z
  .object({
    id: z.number(),
  })
  .nullable()
  .optional();

// Order schema
export const orderSchema = z.object({
  id: z.number(),
  version: z.number().nullable().optional(),
  customer: resourceRefSchema,
  contact: resourceRefSchema,
  attn: resourceRefSchema,
  receiverEmail: z.string().nullable().optional(),
  overdueNoticeEmail: z.string().nullable().optional(),
  number: z.string(),
  reference: z.string().nullable().optional(),
  ourContact: resourceRefSchema,
  ourContactEmployee: resourceRefSchema,
  department: resourceRefSchema,
  orderDate: z.string(),
  project: resourceRefSchema,
  invoiceComment: z.string().nullable().optional(),
  currency: resourceRefSchema,
  invoicesDueIn: z.number().nullable().optional(),
  invoicesDueInType: z
    .enum(['DAYS', 'MONTHS', 'RECURRING_DAY_OF_MONTH'])
    .nullable()
    .optional(),
  isShowOpenPostsOnInvoices: z.boolean().nullable().optional(),
  isClosed: z.boolean(),
  deliveryDate: z.string(),
  deliveryAddress: resourceRefSchema,
  deliveryComment: z.string().nullable().optional(),
  isPrioritizeAmountsIncludingVat: z.boolean().nullable().optional(),
  orderLineSorting: z.enum(['ID', 'PRODUCT', 'CUSTOM']).nullable().optional(),
  orderLines: z.array(orderLineSchema).nullable().optional(),
  isSubscription: z.boolean().nullable().optional(),
  subscriptionDuration: z.number().nullable().optional(),
  subscriptionDurationType: z.enum(['MONTHS', 'YEAR']).nullable().optional(),
  subscriptionPeriodsOnInvoice: z.number().nullable().optional(),
  subscriptionInvoicingTimeInAdvanceOrArrears: z
    .enum(['ADVANCE', 'ARREARS'])
    .nullable()
    .optional(),
  subscriptionInvoicingTime: z.number().nullable().optional(),
  subscriptionInvoicingTimeType: z
    .enum(['DAYS', 'MONTHS'])
    .nullable()
    .optional(),
  isSubscriptionAutoInvoicing: z.boolean().nullable().optional(),
  preliminaryInvoice: resourceRefSchema,
});

export type Order = z.infer<typeof orderSchema>;

// Create order input schema
export const createOrderInputSchema = z.object({
  customerId: z.number().min(1, 'Customer ID is required'),
  contactId: z.number().optional(),
  attnId: z.number().optional(),
  receiverEmail: z.string().email().optional(),
  overdueNoticeEmail: z.string().email().optional(),
  reference: z.string().optional(),
  ourContactId: z.number().optional(),
  ourContactEmployeeId: z.number().optional(),
  departmentId: z.number().optional(),
  orderDate: z.string().optional(), // Will default to today if not provided
  projectId: z.number().optional(),
  invoiceComment: z.string().optional(),
  currencyId: z.number().optional(),
  invoicesDueIn: z.number().optional(),
  invoicesDueInType: z
    .enum(['DAYS', 'MONTHS', 'RECURRING_DAY_OF_MONTH'])
    .default('DAYS'),
  isShowOpenPostsOnInvoices: z.boolean().default(false),
  deliveryDate: z.string().optional(), // Will default to today if not provided
  deliveryAddressId: z.number().optional(),
  deliveryComment: z.string().optional(),
  isPrioritizeAmountsIncludingVat: z.boolean().default(false),
  orderLineSorting: z.enum(['ID', 'PRODUCT', 'CUSTOM']).default('ID'),
  orderLines: z
    .array(createOrderLineInputSchema)
    .min(1, 'At least one order line is required'),
  isSubscription: z.boolean().default(false),
  subscriptionDuration: z.number().optional(),
  subscriptionDurationType: z.enum(['MONTHS', 'YEAR']).optional(),
  subscriptionPeriodsOnInvoice: z.number().optional(),
  subscriptionInvoicingTimeInAdvanceOrArrears: z
    .enum(['ADVANCE', 'ARREARS'])
    .optional(),
  subscriptionInvoicingTime: z.number().optional(),
  subscriptionInvoicingTimeType: z.enum(['DAYS', 'MONTHS']).optional(),
  isSubscriptionAutoInvoicing: z.boolean().default(false),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

// List orders response schema
export const listOrdersResponseSchema = z.object({
  from: z.number(),
  count: z.number(),
  versionDigest: z.string().nullable().optional(),
  values: z.array(orderSchema),
});

export type ListOrdersResponse = z.infer<typeof listOrdersResponseSchema>;

// Create order response schema
export const createOrderResponseSchema = z.object({
  value: orderSchema,
});

export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;

// Create order result (just the ID)
export const createOrderResultSchema = z.object({
  orderId: z.number(),
});

export type CreateOrderResult = z.infer<typeof createOrderResultSchema>;
