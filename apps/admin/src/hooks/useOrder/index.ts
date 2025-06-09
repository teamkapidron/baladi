// Node Modules
import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useGetParams } from '@repo/ui/hooks/useParams';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import type {
  GetAllOrdersRequest,
  GetOrderDetailsAdminRequest,
  GetOrderStatsRequest,
  GetOrderRevenueStatsRequest,
  GetOrderStatusGraphDataRequest,
  GetOrderRevenueGraphDataRequest,
  GetRecentOrdersRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useOrderStats() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

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
    queryKey: [
      ReactQueryKeys.GET_ORDER_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderStats(dateRangeInString),
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
    queryKey: [
      ReactQueryKeys.GET_ORDER_REVENUE_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderRevenueStats(dateRangeInString),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return {
    orderStatsQuery,
    orderRevenueStatsQuery,
  };
}

export function useOrderDashboard() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

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
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderStatusGraphData(dateRangeInString),
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
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderRevenueGraphData(dateRangeInString),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getRecentOrders = useCallback(
    async (payload: GetRecentOrdersRequest['payload']) => {
      const response = await api.get<GetRecentOrdersRequest['response']>(
        '/order/recent',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const recentOrdersQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_RECENT_ORDERS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getRecentOrders(dateRangeInString),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return {
    orderStatusGraphDataQuery,
    orderRevenueGraphDataQuery,
    recentOrdersQuery,
  };
}

export function useOrderDetails(orderId: string) {
  const api = useRequest();

  const getOrderDetails = useCallback(
    async (payload: GetOrderDetailsAdminRequest['payload']) => {
      const response = await api.get<GetOrderDetailsAdminRequest['response']>(
        `/order/details/admin/${payload.orderId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const orderDetailsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
    queryFn: () => getOrderDetails({ orderId: orderId as string }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: !!orderId,
  });

  return orderDetailsQuery;
}

export function useOrder() {
  const api = useRequest();
  const { getAllParams } = useGetParams();

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

  return {
    // Queries
    orders,
    isLoading,
    refetchOrders,
  };
}
