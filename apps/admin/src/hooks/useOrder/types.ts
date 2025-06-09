import { ApiData } from '@/utils/types.util';
import { Order, OrderStatus } from '@repo/types/order';

export enum OrderStatusFilter {
  ALL = 'all',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export type GetAllOrdersRequest = ApiData<
  {
    page?: string;
    limit?: string;
    userId?: string;
    productId?: string;
    status?: OrderStatus;
    search?: string;
    from?: string;
    to?: string;
    sortBy?: 'createdAt' | 'totalPrice' | 'status' | 'quantity';
    sortOrder?: 'asc' | 'desc';
  },
  {
    orders: Order[];
    totalOrders: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetOrderDetailsAdminRequest = ApiData<
  {
    orderId: string;
  },
  {
    order: Order;
  }
>;

export type GetOrderStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    totalOrders: number;
    pendingOrders: number;
    confirmedOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
  }
>;

export type GetOrderRevenueStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
  }
>;

export type GetOrderStatusGraphDataRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    data: {
      date: string;
      confirmed: number;
      shipped: number;
      delivered: number;
      cancelled: number;
    }[];
  }
>;

export type GetOrderRevenueGraphDataRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    data: {
      date: string;
      orderCount: number;
      totalRevenue: number;
      totalCost: number;
      totalProfit: number;
    }[];
  }
>;

export type GetRecentOrdersRequest = ApiData<
  {
    from?: string;
    to?: string;
    limit?: string;
  },
  {
    orders: {
      _id: string;
      totalAmount: number;
      createdAt: Date;
      itemsCount: number;
      user: {
        name: string;
      };
    }[];
  }
>;

export type PreviewPickingListRequest = ApiData<
  {
    orderId: string;
  },
  {
    html: string;
  }
>;

export type PreviewFreightLabelRequest = ApiData<
  {
    orderId: string;
  },
  {
    html: string;
  }
>;
