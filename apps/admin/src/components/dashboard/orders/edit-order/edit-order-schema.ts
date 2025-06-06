import { z } from '@repo/ui/lib/form';

export const orderEditSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  status: z.string(),
  totalAmount: z.string(),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      productName: z.string(),
      quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
      price: z.number(),
      stock: z.number(),
    }),
  ),
});

export type OrderEditFormValues = z.infer<typeof orderEditSchema>;
