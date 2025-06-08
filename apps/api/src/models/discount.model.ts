import { model, Schema } from 'mongoose';
import { DiscountType } from '@repo/types/discount';
import { IDiscount } from './interfaces/discount.model';

const discountSchema = new Schema<IDiscount>(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    code: { type: String, required: true },
    discountType: { type: String, enum: DiscountType, required: true },
    discountValue: { type: Number, required: true },
    validFrom: { type: Date },
    validTo: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Discount = model<IDiscount>('Discount', discountSchema);

export default Discount;
