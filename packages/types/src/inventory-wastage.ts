export interface InventoryWastage {
  _id: string;
  inventoryId: string;
  productId: string;
  categories: string[];
  quantity: number;
  reason?: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
