// Node Modules
import { useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetProductsRequest,
  GetProductByIdRequest,
  GetProductBySlugRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useProducts() {
  const api = useRequest();

  return useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCTS],
    queryFn: async () => {
      const response =
        await api.get<GetProductsRequest['response']>('/product/list');
      return response.data.data;
    },
  });
}

export function useProductById(productId?: string) {
  const api = useRequest();

  return useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_BY_ID, productId],
    queryFn: async () => {
      const response = await api.get<GetProductByIdRequest['response']>(
        `/product/${productId}`,
      );
      return response.data.data;
    },
    enabled: !!productId,
  });
}

export function useProductBySlug(slug?: string) {
  const api = useRequest();

  return useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
    queryFn: async () => {
      const response = await api.get<GetProductBySlugRequest['response']>(
        `/product/slug/${slug}`,
      );
      return response.data.data;
    },
    enabled: !!slug,
  });
}
