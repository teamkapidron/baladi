// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetAddressesRequest,
  GetAddressDetailsRequest,
  AddAddressRequest,
  UpdateAddressRequest,
  DeleteAddressRequest,
  SetDefaultAddressRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useAddress(addressId: string) {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getAddresses = useCallback(async () => {
    const response =
      await api.get<GetAddressesRequest['response']>('/address/list');
    return response.data.data;
  }, [api]);

  const { data: address, isLoading: isAddressLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_ADDRESSES],
    queryFn: getAddresses,
  });

  const getAddressDetails = useCallback(async () => {
    const response = await api.get<GetAddressDetailsRequest['response']>(
      `/address/${addressId}`,
    );
    return response.data.data;
  }, [api, addressId]);

  const { data: addressDetails, isLoading: isAddressDetailsLoading } = useQuery(
    {
      queryKey: [ReactQueryKeys.GET_ADDRESS_DETAILS, addressId],
      queryFn: getAddressDetails,
      enabled: !!addressId,
    },
  );

  const addAddress = useCallback(
    async (payload: AddAddressRequest['payload']) => {
      const response = await api.post<AddAddressRequest['response']>(
        '/address',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Address added successfully');
    },
  });

  const updateAddress = useCallback(
    async (payload: UpdateAddressRequest['payload']) => {
      const response = await api.put<UpdateAddressRequest['response']>(
        `/address/${payload.addressId}`,
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Address updated successfully');
    },
  });

  const deleteAddress = useCallback(
    async (payload: DeleteAddressRequest['payload']) => {
      const response = await api.delete<DeleteAddressRequest['response']>(
        `/address/${payload.addressId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Address deleted successfully');
    },
  });

  const setDefaultAddress = useCallback(
    async (payload: SetDefaultAddressRequest['payload']) => {
      const response = await api.patch<SetDefaultAddressRequest['response']>(
        `/address/${payload.addressId}/default`,
      );
      return response.data.data;
    },
    [api],
  );

  const setDefaultAddressMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Default address updated successfully');
    },
  });

  return {
    // Queries
    address,
    addressDetails,
    isAddressLoading,
    isAddressDetailsLoading,

    // Mutations
    addAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    setDefaultAddressMutation,
  };
}
