// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type {
  GetAllInventoryRequest,
  GetProductInventoryRequest,
  CreateInventoryRequest,
  InventoryStatsRequest,
} from './types';

export function useInventoryStats() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

  const getInventoryStats = useCallback(
    async (payload: InventoryStatsRequest['payload']) => {
      const response = await api.get<InventoryStatsRequest['response']>(
        '/inventory/stats',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const inventoryStatsQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_INVENTORY_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getInventoryStats(dateRangeInString),
  });

  return { inventoryStatsQuery };
}

export function useProductInventory(productId: string) {
  const api = useRequest();
  const { page, limit } = usePagination();

  const getProductInventory = useCallback(
    async (payload: GetProductInventoryRequest['payload']) => {
      const response = await api.get<GetProductInventoryRequest['response']>(
        `/inventory/product/${payload.productId}`,
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const productInventoryQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_INVENTORY, productId, page, limit],
    queryFn: () => getProductInventory({ productId, page, limit }),
  });

  return productInventoryQuery;
}

export function useInventory() {
  const api = useRequest();
  const queryClient = useQueryClient();
  const { page, limit } = usePagination();

  const getAllInventory = useCallback(
    async (payload: GetAllInventoryRequest['payload']) => {
      const response = await api.get<GetAllInventoryRequest['response']>(
        '/inventory',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const inventoryQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_INVENTORY, page, limit],
    queryFn: () => getAllInventory({ page, limit }),
  });

  const createInventory = useCallback(
    async (payload: CreateInventoryRequest['payload']) => {
      const response = await api.post<CreateInventoryRequest['response']>(
        '/inventory',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const createInventoryMutation = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_INVENTORY],
      });
      toast.success('Inventory created successfully');
    },
  });

  return { inventoryQuery, createInventoryMutation };
}
