import { ApiData } from '@/utils/types.util';
import { Discount } from '@repo/types/discount';

export type DiscountRequestBody = Omit<
  Discount,
  'createdAt' | 'updatedAt' | 'isActive'
>;

export type GetDiscountsResponse = ApiData<
  undefined,
  {
    discounts: Discount[];
  }
>;

export type CreateDiscountResponse = ApiData<DiscountRequestBody, Discount>;

export type UpdateDiscountResponse = ApiData<
  {
    discountId: string;
    discount: DiscountRequestBody;
  },
  Discount
>;

export type MakeDiscountInactiveResponse = ApiData<
  {
    discountId: string;
  },
  undefined
>;
