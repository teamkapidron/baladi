import { ApiData } from '@/utils/types.util';
import { Discount } from '@repo/types/discount';
import { BulkDiscount } from '@repo/types/bulkDiscount';
import { Product } from '@repo/types/product';

export type DiscountRequestBody = Omit<
  Discount,
  'createdAt' | 'updatedAt' | 'isActive' | '_id' | 'validFrom' | 'validTo'
> & {
  validFrom?: string;
  validTo?: string;
};

export type BulkDiscountRequestBody = Omit<
  BulkDiscount,
  'createdAt' | 'updatedAt' | 'isActive' | '_id'
>;

export type GetDiscountsResponse = ApiData<
  undefined,
  {
    discounts: (Discount & { productId: Product })[];
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

export type BulkDiscountsResponse = ApiData<
  undefined,
  {
    bulkDiscounts: BulkDiscount[];
  }
>;

export type CreateBulkDiscountResponse = ApiData<
  BulkDiscountRequestBody,
  BulkDiscount
>;
