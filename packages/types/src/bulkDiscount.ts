export interface BulkDiscount {
  _id: string;

  minQuantity: number;
  discountPercentage: number;

  validFrom?: string;
  validTo?: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
