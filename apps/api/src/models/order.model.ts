import { Schema, model } from 'mongoose';
import { IOrder } from './interfaces/order.model';
import { OrderCancellationReason, OrderStatus } from '@repo/types/order';

const orderItemSchema = new Schema({
  productId: {
    ref: 'Product',
    required: true,
    type: Schema.Types.ObjectId,
  },
  quantity: {
    min: 1,
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
    items: {
      required: true,
      type: [orderItemSchema],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    shippingAddress: {
      ref: 'Address',
      required: true,
      type: Schema.Types.ObjectId,
    },
    cancellationReason: {
      type: String,
      enum: Object.values(OrderCancellationReason),
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;
