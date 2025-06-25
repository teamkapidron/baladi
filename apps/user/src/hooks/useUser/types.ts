import { ApiData } from '@/utils/types.util';

export type UpdateUserProfileRequest = ApiData<
  {
    name?: string;
    companyName?: string;
    organizationNumber?: string;
    phoneNumber?: string;
    address?: {
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      postalCode?: string;
    };
  },
  undefined
>;
