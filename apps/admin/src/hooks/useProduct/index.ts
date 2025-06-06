// Node Modules
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

// Types
import type {
  GetAllProductsRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useProduct() {
  const api = useRequest();
  const { getAllParams } = useGetParams();
  const updateParams = useUpdateParams();

  const params = useMemo(() => {
    return getAllParams();
  }, [getAllParams]);

  const getAllProducts = useCallback(
    async (payload: GetAllProductsRequest['payload']) => {
      const response = await api.get<GetAllProductsRequest['response']>(
        '/product/all',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const { data: products, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_PRODUCTS, JSON.stringify(params)],
    queryFn: () => getAllProducts(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const createProduct = useCallback(
    async (payload: CreateProductRequest['payload']) => {
      const response = await api.post<CreateProductRequest['response']>(
        '/product',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  const updateProduct = useCallback(
    async (payload: UpdateProductRequest['payload']) => {
      const response = await api.put<UpdateProductRequest['response']>(
        `/product/${payload.productId}`,
        payload.product,
      );
      return response.data.data;
    },
    [api],
  );

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
  });

  const deleteProduct = useCallback(
    async (payload: DeleteProductRequest['payload']) => {
      const response = await api.delete<DeleteProductRequest['response']>(
        `/product/${payload.productId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
  });

  const applyProductSearchFilters = useCallback(
    (filters: Partial<GetAllProductsRequest['payload']>) => {
      updateParams({
        ...params,
        ...filters,
      });
    },
    [updateParams],
  );

  return {
    // Queries
    products,
    isLoading,

    // Mutations
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,

    // Actions
    applyProductSearchFilters,
  };
}
