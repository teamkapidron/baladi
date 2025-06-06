import { ApiData } from '@/utils/types.util';
import { Order } from '@repo/types/order';

export type PlaceOrderRequest = ApiData<
  {
    items: {
      productId: string;
      quantity: number;
    }[];
    shippingAddressId?: string;
  },
  {
    order: Order;
  }
>;

export type GetUserOrdersRequest = ApiData<
  {
    page: number;
    limit: number;
  },
  {
    orders: Order[];
    totalOrders: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetUserOrderDetailsRequest = ApiData<
  {
    orderId: string;
  },
  {
    order: Order;
  }
>;

export type CancelOrderRequest = ApiData<
  {
    orderId: string;
  },
  {
    order: Order;
  }
>;
