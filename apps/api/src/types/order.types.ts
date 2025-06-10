import { SortOrder } from 'mongoose';
import { Order, OrderStatus } from '@repo/types/order';

export interface OrderFilterQuery {
  $or?: {
    userId?: { $in: string[] };
    'items.productId'?: { $in: string[] };
  }[];
  status?: OrderStatus;
  userId?: string;
  'items.productId'?: string;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export interface OrderSortObject {
  [key: string]: SortOrder;
}

export interface OrderRevenueStats {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
}

export type OrderResponse = Omit<
  Order,
  'userId' | 'shippingAddress' | 'items'
> & {
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  shippingAddress: {
    _id: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    _id: string;
    productId: {
      _id: string;
      name: string;
      sku: string;
      barcode: string;
    };
    quantity: number;
    price: number;
  }[];
};
