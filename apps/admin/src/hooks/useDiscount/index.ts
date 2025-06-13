// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type {
  GetDiscountsResponse,
  CreateDiscountResponse,
  UpdateDiscountResponse,
  MakeDiscountInactiveResponse,
  CreateBulkDiscountResponse,
  BulkDiscountsResponse,
} from './types';

export function useDiscount() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getDiscounts = useCallback(async () => {
    const response =
      await api.get<GetDiscountsResponse['response']>('/discount/all');
    return response.data.data;
  }, [api]);

  const { data: discounts, isLoading: isLoadingDiscounts } = useQuery({
    queryKey: [ReactQueryKeys.GET_DISCOUNTS],
    queryFn: getDiscounts,
    staleTime: 5 * 60 * 1000,
  });

  const createDiscount = useCallback(
    async (discount: CreateDiscountResponse['payload']) => {
      const response = await api.post<CreateDiscountResponse['response']>(
        '/discount',
        discount,
      );

      return response.data.data;
    },
    [api],
  );

  const createDiscountMutation = useMutation({
    mutationFn: createDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Rabatt opprettet vellykket');
    },
  });

  const updateDiscount = useCallback(
    async (discount: UpdateDiscountResponse['payload']) => {
      const response = await api.put<UpdateDiscountResponse['response']>(
        `/discount/${discount.discountId}`,
        discount.discount,
      );

      return response.data.data;
    },
    [api],
  );

  const updateDiscountMutation = useMutation({
    mutationFn: updateDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Rabatt oppdatert vellykket');
    },
  });

  const toggleDiscountActive = useCallback(
    async (discountId: MakeDiscountInactiveResponse['payload']) => {
      const response = await api.delete<
        MakeDiscountInactiveResponse['response']
      >(`/discount/${discountId.discountId}`);
      return response.data.data;
    },
    [api],
  );

  const toggleDiscountActiveMutation = useMutation({
    mutationFn: toggleDiscountActive,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Rabatt status oppdatert vellykket');
    },
  });

  return {
    // Queries
    discounts,
    isLoadingDiscounts,

    // Mutations
    createDiscountMutation,
    updateDiscountMutation,
    toggleDiscountActiveMutation,
  };
}

export function useBulkDiscount() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getBulkDiscounts = useCallback(async () => {
    const response =
      await api.get<BulkDiscountsResponse['response']>('/discount/bulk/all');

    return response.data.data;
  }, [api]);

  const { data: bulkDiscounts, isLoading: isLoadingBulkDiscounts } = useQuery({
    queryKey: [ReactQueryKeys.GET_BULK_DISCOUNTS],
    queryFn: getBulkDiscounts,
    staleTime: 5 * 60 * 1000,
  });

  const createBulkDiscount = useCallback(
    async (discounts: CreateBulkDiscountResponse['payload']) => {
      const response = await api.post<CreateBulkDiscountResponse['response']>(
        '/discount/bulk',
        discounts,
      );

      return response.data.data;
    },
    [api],
  );

  const createBulkDiscountMutation = useMutation({
    mutationFn: createBulkDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_BULK_DISCOUNTS],
      });
      toast.success('Bulk rabatt opprettet vellykket');
    },
  });

  return {
    // Queries
    bulkDiscounts,
    isLoadingBulkDiscounts,

    // Mutations
    createBulkDiscountMutation,
  };
}
