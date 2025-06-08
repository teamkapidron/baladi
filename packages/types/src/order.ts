export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum OrderCancellationReason {
  CUSTOMER_CANCELLED = 'customer_cancelled',
  ADMIN_CANCELLED = 'admin_cancelled',
  OUT_OF_STOCK = 'out_of_stock',
  OTHER = 'other',
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress?: string;
  cancellationReason?: OrderCancellationReason;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
