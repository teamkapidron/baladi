export interface Discount {
  productId: string;

  discountValue: number;

  validFrom?: Date;
  validTo?: Date;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
