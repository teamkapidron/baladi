import { z } from '@repo/ui/lib/form';

export const signupSchema = z.object({
  name: z.string().min(1, 'Navn må være minst 1 tegn'),
  email: z.string().email('Ugyldig e-postadresse'),
  password: z.string().min(8, 'Passord må være minst 8 tegn'),
  confirmPassword: z.string().min(8, 'Passord må være minst 8 tegn'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
