import { AxiosError } from 'axios';
import { sanitizeError } from '@/utils/error.util';
import { toast } from '@repo/ui/lib/sonner';
import { MutationCache, QueryClient } from '@tanstack/react-query';

export function getQueryClient() {
  return new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        const err = sanitizeError(error as AxiosError);
        toast(err.title, {
          duration: 2000,
          description: err.description,
        });
      },
    }),
  });
}

export const queryClient = new QueryClient();
