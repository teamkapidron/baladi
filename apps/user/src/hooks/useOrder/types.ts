import { ApiData } from '@/utils/types.util';
import { Order } from '@repo/types/order';

export type OrderResponse = Omit<
  Order,
  'userId' | 'shippingAddress' | 'items'
> & {
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
      images: string[];
      categories: string[];
      salePrice: number;
    };
    quantity: number;
    price: number;
  }[];
};

export type PlaceOrderRequest = ApiData<
  {
    items: {
      productId: string;
      quantity: number;
    }[];
    shippingAddressId?: string;
  },
  {
    order: OrderResponse;
  }
>;

export type GetUserOrdersRequest = ApiData<
  {
    page: number;
    limit: number;
  },
  {
    orders: OrderResponse[];
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
    order: OrderResponse;
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
