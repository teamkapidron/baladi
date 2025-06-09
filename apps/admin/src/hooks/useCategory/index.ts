// Node Modules
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useGetParams, useUpdateParams } from '@/hooks/useParams';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type {
  GetAllCategoriesRequest,
  GetAllCategoriesFlattenedRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  DeleteCategoryRequest,
  GetCategoryStatsRequest,
} from './types';

export function useCategory() {
  const api = useRequest();
  const queryClient = useQueryClient();
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const dateParams = useMemo(() => {
    return {
      from: getParam('from') ?? undefined,
      to: getParam('to') ?? undefined,
    };
  }, [getParam]);

  const getAllCategories = useCallback(async () => {
    const response =
      await api.get<GetAllCategoriesRequest['response']>('/category/all');
    return response.data.data;
  }, [api]);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const getAllCategoriesFlattened = useCallback(async () => {
    const response = await api.get<
      GetAllCategoriesFlattenedRequest['response']
    >('/category/all/flattened');
    return response.data.data;
  }, [api]);

  const { data: categoriesFlattened, isLoading: isLoadingCategoriesFlattened } =
    useQuery({
      queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES_FLATTENED],
      queryFn: getAllCategoriesFlattened,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    });

  const createCategory = useCallback(
    async (payload: CreateCategoryRequest['payload']) => {
      const response = await api.post<CreateCategoryRequest['response']>(
        '/category/create',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES_FLATTENED],
      });
    },
  });

  const updateCategory = useCallback(
    async (payload: UpdateCategoryRequest['payload']) => {
      const response = await api.put<UpdateCategoryRequest['response']>(
        `/category/update/${payload.categoryId}`,
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES_FLATTENED],
      });
    },
  });

  const deleteCategory = useCallback(
    async (payload: DeleteCategoryRequest['payload']) => {
      const response = await api.delete<DeleteCategoryRequest['response']>(
        `/category/delete/${payload.categoryId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_CATEGORIES_FLATTENED],
      });
    },
  });

  const getCategoryStats = useCallback(
    async (payload: GetCategoryStatsRequest['payload']) => {
      const response = await api.get<GetCategoryStatsRequest['response']>(
        '/category/stats',
        { params: payload },
      );
      return response.data.data.stats;
    },
    [api],
  );

  const categoryStatsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_CATEGORY_STATS],
    queryFn: () => getCategoryStats(dateParams),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const updateDateParams = useCallback(
    (params: Partial<GetCategoryStatsRequest['payload']>) => {
      updateParams({
        from: params.from,
        to: params.to,
      });
    },
    [updateParams],
  );

  return {
    // Queries
    categories,
    isLoadingCategories,
    categoriesFlattened,
    isLoadingCategoriesFlattened,
    categoryStatsQuery,

    // Mutations
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,

    // Actions
    updateDateParams,
  };
}
