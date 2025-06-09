import { ApiData } from '@/utils/types.util';
import { Inventory } from '@repo/types/inventory';

export type InventoryBodyRequest = Pick<Inventory, 'quantity' | 'shelfLife'>;

export type GetAllInventoryRequest = ApiData<
  {
    page: string;
    limit: string;
  },
  {
    inventory: Inventory[];
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
    inventory: Inventory[];
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
