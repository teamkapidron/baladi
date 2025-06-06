import { SortOrder } from 'mongoose';
import { OrderStatus } from '@repo/types/order';

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
