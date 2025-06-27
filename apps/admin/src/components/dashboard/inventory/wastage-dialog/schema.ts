import { z } from '@repo/ui/lib/form';

export const addWastageFormSchema = z.object({
  quantity: z.number().min(1, 'Antall må være minst 1'),
  reason: z.string().optional(),
  note: z.string().optional(),
});

export const editWastageFormSchema = z.object({
  quantity: z.number().min(0, 'Antall må være minst 1'),
  reason: z.string().optional(),
  note: z.string().optional(),
});

export type AddWastageFormValues = z.infer<typeof addWastageFormSchema>;
export type EditWastageFormValues = z.infer<typeof editWastageFormSchema>;
