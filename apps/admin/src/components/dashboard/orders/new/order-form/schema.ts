import { z } from '@repo/ui/lib/form';

export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Produkt er påkrevd'),
  quantity: z.number().min(1, 'Antall må være minst 1'),
  name: z.string().optional(),
  barcode: z.string().optional(),
  images: z.array(z.string()).optional(),
  price: z.number().optional(),
  costPrice: z.number().optional(),
  salePrice: z.number().optional(),
});

export const orderFormSchema = z.object({
  userId: z.string().min(1, 'Kunde er påkrevd'),
  items: z.array(orderItemSchema).min(1, 'Minst ett produkt er påkrevd'),
  shippingAddressId: z.string().min(1, 'Leveringsadresse er påkrevd'),
  notes: z.string().optional(),
  desiredDeliveryDate: z.string().min(1, 'Ønsket leveringsdato er påkrevd'),
  palletType: z.string().optional(),
  userType: z.string().min(1, 'Kundetype er påkrevd'),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export interface OrderFormProps {
  isPending: boolean;
  defaultValues?: OrderFormValues;
  onSubmit: (data: OrderFormValues) => void;
}
