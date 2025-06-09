export interface Inventory {
  _id: string;

  productId: string;
  quantity: number;

  shelfLife: {
    duration: number;
    unit: 'days' | 'months' | 'years';
  };

  expirationDate: Date;

  createdAt: Date;
  updatedAt: Date;
}
