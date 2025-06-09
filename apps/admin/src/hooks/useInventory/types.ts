import { ApiData } from '@/utils/types.util';
import { Inventory } from '@repo/types/inventory';

export type InventoryBodyRequest = Pick<Inventory, 'quantity' | 'shelfLife'>;

export type InventoryResponse = Omit<Inventory, 'productId'> & {
  productId: {
    _id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
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
    inventory: InventoryBodyRequest;
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
