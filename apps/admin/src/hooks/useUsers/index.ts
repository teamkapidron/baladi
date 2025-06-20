// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useUserFilter } from './useUserFilter';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import {
  GetAllCustomersRequest,
  GetCustomerDetailsRequest,
  UpdateUserRequest,
  GetUserRegistrationGraphDataRequest,
  GetUserStatsRequest,
  TopUsersRequest,
  CreateUserRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import { toast } from '@repo/ui/lib/sonner';

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
  const { page, limit } = usePagination();
  const { dateRangeInString } = useDateRangeInParams();
  const { search, userType, status } = useUserFilter();
  const queryClient = useQueryClient();

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
      search,
      userType,
      status,
      page,
      limit,
    ],
    queryFn: () =>
      getAllUsers({
        search,
        userType: userType ?? undefined,
        status,
        page,
        limit,
      }),
  });

  const updateUser = useCallback(
    async (payload: UpdateUserRequest['payload']) => {
      const response = await api.put<UpdateUserRequest['response']>(
        `/user/update`,
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
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
  });
  const createUser = useCallback(
    async (payload: CreateUserRequest['payload']) => {
      const response = await api.post<CreateUserRequest['response']>(
        '/user/create',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_USERS],
      });
      toast.success('User created successfully');
    },
  });

  return {
    // Queries
    users,
    isLoading,
    getUserRegistrationGraphDataQuery,
    getTopUsersQuery,

    // Mutations
    updateUserMutation,
    createUserMutation,
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
    enabled: !!userId,
  });

  return {
    userDetailsQuery,
  };
}
