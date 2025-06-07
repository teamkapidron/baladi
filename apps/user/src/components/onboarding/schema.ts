import { z } from '@repo/ui/lib/form';

export const onboardingSchema = z.object({
  companyName: z.string().min(1, 'Bedriftens navn må være minst 1 tegn'),
  organizationNumber: z
    .string()
    .min(1, 'Organisasjonsnummer må være minst 1 tegn'),
  phoneNumber: z.string().min(1, 'Telefonnummer må være minst 1 tegn'),
  address: z.string().min(1, 'Adresse må være minst 1 tegn'),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
