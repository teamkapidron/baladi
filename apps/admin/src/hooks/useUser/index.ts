// Node Modules
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

// Types
import type {
  GetAllCustomersRequest,
  GetCustomerDetailsRequest,
  ApproveCustomerRequest,
  GetUserRegistrationGraphDataRequest,
  GetUserStatsRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useUser(userId?: string) {
  const api = useRequest();
  const { getAllParams } = useGetParams();
  const updateParams = useUpdateParams();

  const params = useMemo(() => {
    return getAllParams();
  }, [getAllParams]);

  const getAllUsers = useCallback(
    async (payload: GetAllCustomersRequest['payload']) => {
      const response = await api.get<GetAllCustomersRequest['response']>(
        '/user/all',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const { data: users, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_USERS, JSON.stringify(params)],
    queryFn: () => getAllUsers(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getUserDetails = useCallback(
    async (payload: GetCustomerDetailsRequest['payload']) => {
      if (!payload.userId) return;

      const response = await api.get<GetCustomerDetailsRequest['response']>(
        `/user/${payload.userId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const userDetailsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_USER_DETAILS, userId],
    queryFn: () => getUserDetails({ userId: userId as string }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: !!userId,
  });

  const approveUser = useCallback(
    async (payload: ApproveCustomerRequest['payload']) => {
      const response = await api.put<ApproveCustomerRequest['response']>(
        `/user/approve`,
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const approveUserMutation = useMutation({
    mutationFn: approveUser,
  });

  const getUserRegistrationGraphData = useCallback(
    async (payload: GetUserRegistrationGraphDataRequest['payload']) => {
      const response = await api.get<
        GetUserRegistrationGraphDataRequest['response']
      >('/user/graph/registration', { params: payload });
      return response.data.data;
    },
    [api],
  );

  const getUserRegistrationGraphDataQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_USER_REGISTRATION_GRAPH_DATA],
    queryFn: () => getUserRegistrationGraphData(params),
  });

  const getUserStats = useCallback(
    async (payload: GetUserStatsRequest['payload']) => {
      const response = await api.get<GetUserStatsRequest['response']>(
        '/user/stats',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const getUserStatsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_USER_STATS],
    queryFn: () => getUserStats(params),
  });

  const applyUserSearchFilters = useCallback(
    (filters: Partial<GetAllCustomersRequest['payload']>) => {
      updateParams({
        ...params,
        ...filters,
      });
    },
    [updateParams],
  );

  return {
    // Queries
    users,
    isLoading,
    userDetailsQuery,
    getUserRegistrationGraphDataQuery,

    // Mutations
    approveUserMutation,

    // Actions
    applyUserSearchFilters,
  };
}
