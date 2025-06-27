import { ApiData } from '@/utils/types.util';
import { Inventory } from '@repo/types/inventory';
import { InventoryWastage } from '@repo/types/inventory-wastage';

export enum InventoryStatus {
  ALL = 'all',
  IN_STOCK = 'in-stock',
  LOW_STOCK = 'low-stock',
  OUT_OF_STOCK = 'out-of-stock',
}

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
  wastage?: {
    _id: string;
    quantity: number;
    reason?: string;
    note?: string;
  };
};

export type GetAllInventoryRequest = ApiData<
  {
    page: string;
    limit: string;
    search?: string;
    status: InventoryStatus;
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
    totalQuantity: number;
    activeLots: number;
    totalValue: number;
    totalWastage: number;
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

export type UpdateInventoryRequest = ApiData<
  {
    inventoryId: string;
    quantity: number;
    expirationDate: string;
  },
  {
    inventory: Inventory;
  }
>;

export type DeleteInventoryRequest = ApiData<
  {
    inventoryId: string;
  },
  {
    message: string;
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

export type CreateInventoryWastageRequest = ApiData<
  {
    inventoryId: string;
    quantity: number;
    reason?: string;
    note?: string;
  },
  {
    inventoryWastage: InventoryWastage;
  }
>;

export type UpdateInventoryWastageRequest = ApiData<
  {
    inventoryWastageId: string;
    quantity?: number;
    reason?: string;
    note?: string;
  },
  {
    inventoryWastage: InventoryWastage;
  }
>;
