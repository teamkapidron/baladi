import { model, Schema } from 'mongoose';
import { IInventory } from './interfaces/inventory.model';

const inventorySchema = new Schema<IInventory>(
  {
    productId: {
      ref: 'Product',
      required: true,
      type: Schema.Types.ObjectId,
    },
    quantity: {
      type: Number,
      required: true,
    },

    shelfLife: {
      duration: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Inventory = model<IInventory>('Inventory', inventorySchema);

export default Inventory;
