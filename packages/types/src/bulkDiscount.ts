export interface BulkDiscount {
  _id: string;

  minQuantity: number;
  discountPercentage: number;

  validFrom?: Date;
  validTo?: Date;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
