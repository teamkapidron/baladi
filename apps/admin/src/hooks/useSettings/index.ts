// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';
// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetAdminProfileRequest,
  GetAllAdminsRequest,
  UpdateAdminPasswordRequest,
  UpdateAdminPasswordSchema,
  CreateAdminSchema,
  CreateAdminResponse,
  SiteConfigRequest,
  UpdateSiteConfigRequest,
  SiteConfigBody,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useSettings() {
  const api = useRequest();

  const getAdminProfile = useCallback(async () => {
    const response =
      await api.get<GetAdminProfileRequest['response']>('/auth/admin/me');
    return response.data.data;
  }, [api]);

  const adminProfileQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ADMIN_PROFILE],
    queryFn: getAdminProfile,
  });

  const updatePassword = useCallback(
    async (request: UpdateAdminPasswordSchema['body']) => {
      const response = await api.put<UpdateAdminPasswordRequest['response']>(
        '/user/admin/password',
        request,
      );
      return response.data.data;
    },
    [api],
  );

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success('Passord oppdatert');
    },
  });

  const getAllAdmins = useCallback(async () => {
    const response =
      await api.get<GetAllAdminsRequest['response']>('/user/admin/all');
    return response.data.data;
  }, [api]);

  const getAllAdminsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_ADMINS],
    queryFn: getAllAdmins,
  });

  const createAdmin = useCallback(
    async (request: CreateAdminSchema['body']) => {
      const response = await api.post<CreateAdminResponse['response']>(
        '/auth/admin/create',
        request,
      );
      return response.data.data;
    },
    [api],
  );

  const createAdminMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      toast.success('Admin opprettet');
    },
  });

  const siteConfig = useCallback(async () => {
    const response =
      await api.get<SiteConfigRequest['response']>('/product/config');
    return response.data.data;
  }, [api]);

  const siteConfigQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_SITE_CONFIG],
    queryFn: siteConfig,
  });

  const updateSiteConfig = useCallback(
    async (request: SiteConfigBody) => {
      const response = await api.put<UpdateSiteConfigRequest['response']>(
        '/product/update/config',
        request,
      );
      return response.data.data;
    },
    [api],
  );

  const updateSiteConfigMutation = useMutation({
    mutationFn: updateSiteConfig,
    onSuccess: () => {
      toast.success('Palett oppdatert');
    },
  });

  return {
    // Queries
    adminProfileQuery,
    getAllAdminsQuery,
    siteConfigQuery,
    // Mutations
    updatePasswordMutation,
    createAdminMutation,
    updateSiteConfigMutation,
  };
}
