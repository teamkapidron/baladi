// Node Modules
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

// Types
import {
  GetAllCustomersRequest,
  GetCustomerDetailsRequest,
  ApproveCustomerRequest,
  GetUserRegistrationGraphDataRequest,
  GetUserStatsRequest,
  UserStatusFilter,
  UserSort,
} from './types';
import { UserType } from '@repo/types/user';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useUsers(userId?: string) {
  const api = useRequest();
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const params = useMemo(() => {
    return {
      name: getParam('name') ?? undefined,
      email: getParam('email') ?? undefined,
      userType: getParam('userType') as UserType | undefined,
      status: getParam('status') as UserStatusFilter | undefined,
      page: getParam('page') ?? undefined,
      limit: getParam('limit') ?? undefined,
      sort: getParam('sort') as UserSort | undefined,
      from: getParam('from') ?? undefined,
      to: getParam('to') ?? undefined,
    };
  }, [getParam]);

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
    queryFn: () =>
      getAllUsers({
        email: params.email,
        name: params.name,
        userType: params.userType,
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        status: params.status,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getUserDetails = useCallback(
    async (payload: GetCustomerDetailsRequest['payload']) => {
      if (!payload.userId) return;

      const response = await api.get<GetCustomerDetailsRequest['response']>(
        `/user/details/${payload.userId}`,
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
    queryFn: () =>
      getUserRegistrationGraphData({ from: params.from, to: params.to }),
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
    queryFn: () => getUserStats({ from: params.from, to: params.to }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
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

  const userStatusFilter = useMemo(() => {
    return (params.status as UserStatusFilter) ?? UserStatusFilter.ALL;
  }, [params]);

  const setUserStatusFilter = useCallback(
    (filter: UserStatusFilter) => {
      updateParams({ status: filter });
    },
    [updateParams],
  );

  return {
    // Queries
    users,
    isLoading,
    userDetailsQuery,
    getUserStatsQuery,
    getUserRegistrationGraphDataQuery,

    // Mutations
    approveUserMutation,

    // Actions
    applyUserSearchFilters,
    userStatusFilter,
    setUserStatusFilter,
  };
}
