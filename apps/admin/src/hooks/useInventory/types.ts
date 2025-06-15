import { ApiData } from '@/utils/types.util';
import { Inventory } from '@repo/types/inventory';

export type InventoryResponse = Omit<Inventory, 'productId'> & {
  product: {
    _id: string;
    name: string;
    sku: string;
    categories: {
      _id: string;
      name: string;
    }[];
    salePrice: number;
  };
};

export type GetAllInventoryRequest = ApiData<
  {
    page: string;
    limit: string;
  },
  {
    inventory: InventoryResponse[];
    totalInventory: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetProductInventoryRequest = ApiData<
  {
    productId: string;
    page: string;
    limit: string;
  },
  {
    inventory: InventoryResponse[];
    totalInventory: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type CreateInventoryRequest = ApiData<
  {
    productId: string;
    quantity: number;
    expirationDate: string;
  },
  {
    inventory: Inventory;
  }
>;

export type InventoryStatsRequest = ApiData<
  {
    from: string;
    to: string;
  },
  {
    outOfStockCount: number;
    lowStockCount: number;
    totalInventoryValue: number;
  }
>;
