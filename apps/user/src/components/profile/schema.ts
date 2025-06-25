import { z } from '@repo/ui/lib/form';

export type UserWithAddress = {
  name: string;
  email: string;
  userType: string;
  isApprovedByAdmin: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  companyName: string;
  organizationNumber: string;
  phoneNumber: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
  };
};

export const editProfileSchema = z.object({
  name: z.string().min(2, 'Navn må være minst 2 tegn').optional(),
  companyName: z.string().optional(),
  organizationNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});
