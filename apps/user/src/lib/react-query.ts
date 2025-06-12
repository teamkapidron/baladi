// Node Modules
import { AxiosError } from 'axios';
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Utils
import { sanitizeError } from '@/utils/error.util';

// Types
import type { ApiError } from '@/utils/types.util';

export function getQueryClient(): {
  queryClient: QueryClient;
  persister: ReturnType<typeof createSyncStoragePersister> | undefined;
} {
  let persister: ReturnType<typeof createSyncStoragePersister> | undefined;

  if (typeof window !== 'undefined') {
    persister = createSyncStoragePersister({
      storage: window.localStorage,
    });
  }

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        const err = sanitizeError(error as AxiosError<ApiError>);
        toast.error(err.title, { description: err.description });
      },
    }),
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
        staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    },
  });

  return {
    queryClient,
    persister,
  };
}
