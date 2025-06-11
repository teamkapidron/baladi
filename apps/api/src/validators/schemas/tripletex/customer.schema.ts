import { z } from 'zod';

// Resource reference schema
export const resourceRefSchema = z
  .object({
    id: z.number(),
  })
  .nullable()
  .optional();

// Customer category schema
const customerCategorySchema = z
  .object({
    id: z.number().nullable().optional(),
    version: z.number().nullable().optional(),
    name: z.string().nullable().optional(),
    number: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    type: z.number().nullable().optional(),
  })
  .nullable()
  .optional();

// Company bank account presentation schema
const companyBankAccountPresentationSchema = z.object({
  iban: z.string().nullable().optional(),
  bban: z.string().nullable().optional(),
  bic: z.string().nullable().optional(),
  country: resourceRefSchema,
  provider: z.enum(['NETS', 'AUTOPAY']).nullable().optional(),
});

// Customer schema
export const customerSchema = z.object({
  id: z.number(),
  version: z.number().nullable().optional(),
  name: z.string(),
  organizationNumber: z.string().nullable().optional(),
  supplierNumber: z.number().nullable().optional(),
  customerNumber: z.number().nullable().optional(),
  isSupplier: z.boolean(),
  accountManager: resourceRefSchema,
  email: z.string().nullable().optional(),
  invoiceEmail: z.string().nullable().optional(),
  overdueNoticeEmail: z.string().nullable().optional(),
  bankAccounts: z.array(z.string()).nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  phoneNumberMobile: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  language: z.enum(['NO', 'EN', 'SV']),
  isPrivateIndividual: z.boolean().nullable().optional(),
  singleCustomerInvoice: z.boolean().nullable().optional(),
  invoiceSendMethod: z.enum([
    'EMAIL',
    'EHF',
    'EFAKTURA',
    'VIPPS',
    'PAPER',
    'MANUAL',
  ]),
  emailAttachmentType: z.enum(['LINK', 'ATTACHMENT']),
  postalAddress: resourceRefSchema,
  physicalAddress: resourceRefSchema,
  deliveryAddress: resourceRefSchema,
  category1: customerCategorySchema,
  category2: customerCategorySchema,
  category3: customerCategorySchema,
  invoicesDueIn: z.number().nullable().optional(),
  invoicesDueInType: z.enum(['DAYS', 'MONTHS', 'RECURRING_DAY_OF_MONTH']),
  currency: resourceRefSchema,
  bankAccountPresentation: z
    .array(companyBankAccountPresentationSchema)
    .nullable()
    .optional(),
  isCustomer: z.boolean(),
  isInactive: z.boolean(),
});

export type Customer = z.infer<typeof customerSchema>;

// Create customer input schema
export const createCustomerInputSchema = z.object({
  name: z.string().min(1, 'Customer name is required'),
  organizationNumber: z.string().optional(),
  email: z.string().email().optional(),
  invoiceEmail: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  phoneNumberMobile: z.string().optional(),
  description: z.string().optional(),
  language: z.enum(['NO', 'EN', 'SV']).default('NO').optional(),
  isPrivateIndividual: z.boolean().default(false).optional(),
  singleCustomerInvoice: z.boolean().default(false).optional(),
  invoiceSendMethod: z
    .enum(['EMAIL', 'EHF', 'EFAKTURA', 'VIPPS', 'PAPER', 'MANUAL'])
    .default('EMAIL')
    .optional(),
  emailAttachmentType: z
    .enum(['LINK', 'ATTACHMENT'])
    .default('LINK')
    .optional(),
  invoicesDueIn: z.number().optional(),
  invoicesDueInType: z
    .enum(['DAYS', 'MONTHS', 'RECURRING_DAY_OF_MONTH'])
    .default('DAYS')
    .optional(),
  isCustomer: z.boolean().default(true).optional(),
  isSupplier: z.boolean().default(false).optional(),
  accountManagerId: z.number().optional(),
  currencyId: z.number().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerInputSchema>;

// Create customer response schema
export const createCustomerResponseSchema = z.object({
  value: customerSchema,
});

export type CreateCustomerResponse = z.infer<
  typeof createCustomerResponseSchema
>;

// Create customer result (just the ID)
export const createCustomerResultSchema = z.object({
  customerId: z.number(),
  isInactive: z.boolean().nullable().optional(),
});

export type CreateCustomerResult = z.infer<typeof createCustomerResultSchema>;
