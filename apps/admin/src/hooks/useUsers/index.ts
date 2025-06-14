// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useUserFilter } from './useUserFilter';
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
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useUserStats() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

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

export function useUsers() {
  const api = useRequest();
  const { page, limit, handlePageSizeChange, handlePageChange } =
    usePagination();
  const { dateRangeInString, setDateRange } = useDateRangeInParams();
  const {
    userFilter,
    handleUserStatusFilterChange,
    handleUserTypeFilterChange,
    handleUserEmailFilterChange,
    handleUserNameFilterChange,
  } = useUserFilter();

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
    queryKey: [
      ReactQueryKeys.GET_ALL_USERS,
      userFilter.email,
      userFilter.name,
      userFilter.userType,
      userFilter.status,
      page,
      limit,
    ],
    queryFn: () =>
      getAllUsers({
        email: userFilter.email,
        name: userFilter.name,
        userType: userFilter.userType,
        page,
        limit,
        status: userFilter.status,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
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
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getUserRegistrationGraphData(dateRangeInString),
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
    queryKey: [
      ReactQueryKeys.GET_TOP_USERS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getTopUsers(dateRangeInString),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    // Queries
    users,
    isLoading,
    getUserRegistrationGraphDataQuery,
    getTopUsersQuery,

    // Mutations
    approveUserMutation,

    // Actions
    page,
    limit,
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

export function useUserDetails(userId: string) {
  const api = useRequest();

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

  return {
    userDetailsQuery,
  };
}
