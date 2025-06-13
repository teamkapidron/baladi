export interface Discount {
  _id: string;
  productId: string;

  discountValue: number;

  validFrom?: string;
  validTo?: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
