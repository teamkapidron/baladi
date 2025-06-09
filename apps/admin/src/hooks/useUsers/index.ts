// Node Modules
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useUserFilter } from './useUserFilter';
import { useGetParams } from '@repo/ui/hooks/useParams';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import {
  GetAllCustomersRequest,
  GetCustomerDetailsRequest,
  ApproveCustomerRequest,
  GetUserRegistrationGraphDataRequest,
  GetUserStatsRequest,
  TopUsersRequest,
} from './types';
import { UserType } from '@repo/types/user';
import { UserStatusFilter, UserSort } from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useUserStats() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

  console.log('🔥 useUserStats: dateRangeInString changed', dateRangeInString);

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
    queryKey: [
      ReactQueryKeys.GET_USER_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getUserStats(dateRangeInString),
  });

  return getUserStatsQuery;
}

export function useUsers(userId?: string) {
  const api = useRequest();
  const { getParam } = useGetParams();
  const { paginationInfo, handlePageSizeChange, handlePageChange } =
    usePagination();
  const { dateRangeInString, setDateRange } = useDateRangeInParams();
  const {
    userFilter,
    handleUserStatusFilterChange,
    handleUserTypeFilterChange,
    handleUserEmailFilterChange,
    handleUserNameFilterChange,
  } = useUserFilter();

  const params = useMemo(() => {
    return {
      name: userFilter.name,
      email: userFilter.email,
      userType: userFilter.userType,
      status: userFilter.status,
      page: paginationInfo.page,
      limit: paginationInfo.limit,
      sort: getParam('sort') as UserSort | undefined,
    };
  }, [getParam, paginationInfo, userFilter]);

  const dateParams = useMemo(() => {
    return {
      from: dateRangeInString.from,
      to: dateRangeInString.to,
    };
  }, [dateRangeInString]);

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
    queryKey: [
      ReactQueryKeys.GET_USER_REGISTRATION_GRAPH_DATA,
      JSON.stringify(dateParams),
    ],
    queryFn: () => getUserRegistrationGraphData(dateParams),
  });

  const getTopUsers = useCallback(
    async (payload: TopUsersRequest['payload']) => {
      const response = await api.get<TopUsersRequest['response']>('/user/top', {
        params: payload,
      });
      return response.data.data;
    },
    [api],
  );

  const getTopUsersQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_TOP_USERS, JSON.stringify(dateParams)],
    queryFn: () => getTopUsers(dateParams),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    // Queries
    users,
    isLoading,
    userDetailsQuery,
    getUserRegistrationGraphDataQuery,
    getTopUsersQuery,

    // Mutations
    approveUserMutation,

    // Actions
    paginationInfo,
    handlePageSizeChange,
    handlePageChange,

    dateRangeInString,
    setDateRange,

    userFilter,
    handleUserStatusFilterChange,
    handleUserTypeFilterChange,
    handleUserEmailFilterChange,
    handleUserNameFilterChange,
  };
}
