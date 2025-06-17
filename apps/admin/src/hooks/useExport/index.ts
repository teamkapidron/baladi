// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useExport() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const downloadExcelFile = useCallback(
    async (url: string, filename: string) => {
      const response = await api.get(url, { responseType: 'blob' });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    },
    [api],
  );

  const exportOrders = useCallback(async () => {
    await downloadExcelFile('/export/orders', 'orders.xlsx');
  }, [api]);

  const exportOrdersMutation = useMutation({
    mutationFn: exportOrders,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.EXPORT_ORDERS],
      });
      toast.success('Ordrer eksportert');
    },
  });

  const exportProducts = useCallback(async () => {
    await downloadExcelFile('/export/products', 'products.xlsx');
  }, [api]);

  const exportProductsMutation = useMutation({
    mutationFn: exportProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.EXPORT_PRODUCTS],
      });
      toast.success('Produkter eksportert');
    },
  });

  const exportUsers = useCallback(async () => {
    await downloadExcelFile('/export/users', 'users.xlsx');
  }, [api]);

  const exportUsersMutation = useMutation({
    mutationFn: exportUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.EXPORT_USERS],
      });
      toast.success('Brukere eksportert');
    },
  });

  return {
    exportOrdersMutation,
    exportProductsMutation,
    exportUsersMutation,
  };
}
