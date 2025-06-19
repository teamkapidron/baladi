// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetAddressesRequestAdmin,
  AddAddressRequestAdmin,
  CreateOrderRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import { GetAllCustomersRequest } from '../useUsers/types';

export function useCreateOrder(userId?: string) {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getAddresses = useCallback(
    async (payload: GetAddressesRequestAdmin['payload']) => {
      const response = await api.get<GetAddressesRequestAdmin['response']>(
        `/address/admin/list/${payload.userId}`,
        {
          params: payload,
        },
      );
      return response.data.data;
    },
    [api],
  );

  const getAddressesQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ADDRESSES_ADMIN, userId],
    enabled: !!userId,
    queryFn: () =>
      getAddresses({ userId: userId || '', page: '1', limit: '10' }),
  });

  const addAddress = useCallback(
    async (payload: AddAddressRequestAdmin['payload']) => {
      const response = await api.post<AddAddressRequestAdmin['response']>(
        `/address/admin/add/${payload.userId}`,
        payload.address,
      );
      return response.data.data;
    },
    [api],
  );

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES_ADMIN, userId],
      });
      toast.success('Address added successfully');
    },
  });
  const createOrder = useCallback(
    async (payload: CreateOrderRequest['payload']) => {
      const response = await api.post<CreateOrderRequest['response']>(
        '/order/admin/create',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_ORDERS],
      });
      toast.success('Ordre opprettet successfully');
    },
  });

  return {
    // Queries
    getAddressesQuery,

    // Mutations
    addAddressMutation,
    createOrderMutation,
  };
}
export function useSearchUsers(query: string) {
  const api = useRequest();
  const searchUsers = useCallback(
    async (payload: GetAllCustomersRequest['payload']) => {
      const response = await api.get<GetAllCustomersRequest['response']>(
        '/user/all',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const searchUsersQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_USERS, query],
    queryFn: () => searchUsers({ search: query, page: '1', limit: '5' }),
  });

  return { searchUsersQuery };
}
