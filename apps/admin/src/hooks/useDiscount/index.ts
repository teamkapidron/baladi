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
      toast.success('Discount created successfully');
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
      toast.success('Discount updated successfully');
    },
  });

  const makeDiscountInactive = useCallback(
    async (discountId: MakeDiscountInactiveResponse['payload']) => {
      const response = await api.delete<
        MakeDiscountInactiveResponse['response']
      >(`/discount/${discountId}`);

      return response.data.data;
    },
    [api],
  );

  const makeDiscountInactiveMutation = useMutation({
    mutationFn: makeDiscountInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Discount made inactive successfully');
    },
  });

  return {
    // Queries
    discounts,
    isLoadingDiscounts,

    // Mutations
    createDiscountMutation,
    updateDiscountMutation,
    makeDiscountInactiveMutation,
  };
}
