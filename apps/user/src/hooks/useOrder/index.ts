// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  PlaceOrderRequest,
  GetUserOrdersRequest,
  GetUserOrderDetailsRequest,
  CancelOrderRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useOrder(orderId?: string) {
  const api = useRequest();
  const queryClient = useQueryClient();

  const placeOrder = useCallback(
    async (payload: PlaceOrderRequest['payload']) => {
      const response = await api.post<PlaceOrderRequest['response']>(
        '/order/place',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_USER_ORDERS],
      });
      toast.success('Order placed successfully');
    },
  });

  const getUserOrders = useCallback(
    async (payload: GetUserOrdersRequest['payload']) => {
      const response = await api.get<GetUserOrdersRequest['response']>(
        '/order/my',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const { data: userOrders, isLoading: isUserOrdersLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_USER_ORDERS],
    queryFn: () => getUserOrders({ page: 1, limit: 10 }),
  });

  const getUserOrderDetails = useCallback(async () => {
    const response = await api.get<GetUserOrderDetailsRequest['response']>(
      `/order/${orderId}`,
    );
    return response.data.data;
  }, [api]);

  const orderDetailsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_USER_ORDER_DETAILS, orderId],
    queryFn: getUserOrderDetails,
    enabled: !!orderId,
  });

  const cancelOrder = useCallback(
    async (payload: CancelOrderRequest['payload']) => {
      const response = await api.post<CancelOrderRequest['response']>(
        '/order/cancel',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_USER_ORDERS],
      });
      toast.success('Order Cancelled successfully');
    },
  });

  return {
    // Queries
    userOrders,
    orderDetailsQuery,
    isUserOrdersLoading,

    // Mutations
    placeOrderMutation,
    cancelOrderMutation,
  };
}
