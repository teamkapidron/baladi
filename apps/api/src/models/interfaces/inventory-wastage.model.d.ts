import { InventoryWastage } from '@repo/types/inventory-wastage';
import { Document, Types } from 'mongoose';

export interface IInventoryWastage extends Document, InventoryWastage {
  inventoryId: Types.ObjectId;
  productId: Types.ObjectId;
  categories: Types.ObjectId[];
}
