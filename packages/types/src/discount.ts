export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export interface Discount {
  productId: string;

  code: string;
  discountType: DiscountType;
  discountValue: number;

  validFrom?: Date;
  validTo?: Date;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
