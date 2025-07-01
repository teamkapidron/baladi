// Node Modules
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type { UpdateUserProfileRequest } from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useUser() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const updateProfile = useCallback(
    async (payload: UpdateUserProfileRequest['payload']) => {
      const response = await api.post<UpdateUserProfileRequest['response']>(
        '/user/update/profile',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async function () {
      await queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_USER_DATA],
      });
      toast.success('Profil oppdatert');
    },
  });

  return {
    updateProfileMutation,
  };
}
