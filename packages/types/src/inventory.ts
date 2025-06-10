export interface Inventory {
  _id: string;

  productId: string;
  quantity: number;

  expirationDate: Date;

  createdAt: Date;
  updatedAt: Date;
}
