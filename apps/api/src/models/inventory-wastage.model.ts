import { Schema, model } from 'mongoose';
import { IInventoryWastage } from './interfaces/inventory-wastage.model';

const inventoryWastageSchema = new Schema<IInventoryWastage>(
  {
    inventoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true,
      unique: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: 'Category',
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const InventoryWastage = model<IInventoryWastage>(
  'InventoryWastage',
  inventoryWastageSchema,
);

export default InventoryWastage;
