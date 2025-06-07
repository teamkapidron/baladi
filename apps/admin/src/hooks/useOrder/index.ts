// Node Modules
import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

// Types
import type {
  GetAllOrdersRequest,
  GetOrderDetailsAdminRequest,
  GetOrderStatsRequest,
  GetOrderRevenueStatsRequest,
  GetOrderStatusGraphDataRequest,
  GetOrderRevenueGraphDataRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useOrder(orderId?: string) {
  const api = useRequest();
  const { getAllParams } = useGetParams();
  const updateParams = useUpdateParams();

  const params = useMemo(() => {
    return getAllParams();
  }, [getAllParams]);

  const getAllOrders = useCallback(
    async (payload: GetAllOrdersRequest['payload']) => {
      const response = await api.get<GetAllOrdersRequest['response']>(
        '/order/all',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const {
    data: orders,
    isLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_ORDERS, JSON.stringify(params)],
    queryFn: () => getAllOrders(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getOrderDetailsAdmin = useCallback(
    async (payload: GetOrderDetailsAdminRequest['payload']) => {
      const response = await api.get<GetOrderDetailsAdminRequest['response']>(
        `/order/details/${payload.orderId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const orderDetailsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
    queryFn: () => getOrderDetailsAdmin({ orderId: orderId as string }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: !!orderId,
  });

  const getOrderStats = useCallback(
    async (payload: GetOrderStatsRequest['payload']) => {
      const response = await api.get<GetOrderStatsRequest['response']>(
        '/order/stats',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const orderStatsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ORDER_STATS, JSON.stringify(params)],
    queryFn: () => getOrderStats(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getOrderRevenueStats = useCallback(
    async (payload: GetOrderRevenueStatsRequest['payload']) => {
      const response = await api.get<GetOrderRevenueStatsRequest['response']>(
        '/order/stats/revenue',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const orderRevenueStatsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ORDER_REVENUE_STATS, JSON.stringify(params)],
    queryFn: () => getOrderRevenueStats(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getOrderStatusGraphData = useCallback(
    async (payload: GetOrderStatusGraphDataRequest['payload']) => {
      const response = await api.get<
        GetOrderStatusGraphDataRequest['response']
      >('/order/graph/status', { params: payload });
      return response.data.data;
    },
    [api],
  );

  const orderStatusGraphDataQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ORDER_STATUS_GRAPH_DATA,
      JSON.stringify(params),
    ],
    queryFn: () => getOrderStatusGraphData(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getOrderRevenueGraphData = useCallback(
    async (payload: GetOrderRevenueGraphDataRequest['payload']) => {
      const response = await api.get<
        GetOrderRevenueGraphDataRequest['response']
      >('/order/graph/revenue', { params: payload });
      return response.data.data;
    },
    [api],
  );

  const orderRevenueGraphDataQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ORDER_REVENUE_GRAPH_DATA,
      JSON.stringify(params),
    ],
    queryFn: () => getOrderRevenueGraphData(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const applyOrderSearchFilters = useCallback(
    (filters: Partial<GetAllOrdersRequest['payload']>) => {
      updateParams({
        ...params,
        ...filters,
      });
    },
    [updateParams],
  );

  const applyOrderSorting = useCallback(
    (
      sortBy: GetAllOrdersRequest['payload']['sortBy'],
      sortOrder: GetAllOrdersRequest['payload']['sortOrder'],
    ) => {
      if (!sortBy || !sortOrder) return;

      updateParams({
        ...params,
        sortBy,
        sortOrder,
      });
    },
    [updateParams],
  );

  return {
    // Queries
    orders,
    isLoading,
    orderDetailsQuery,
    refetchOrders,
    orderStatsQuery,
    orderRevenueStatsQuery,
    orderStatusGraphDataQuery,
    orderRevenueGraphDataQuery,

    // Mutations

    // Actions
    applyOrderSearchFilters,
    applyOrderSorting,
  };
}
