// Node Modules
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetCategoriesRequest,
  GetCategoriesFlattenedRequest,
  GetCategoryByIdRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useCategory(categoryId?: string) {
  const api = useRequest();

  const getCategories = useCallback(async () => {
    const response =
      await api.get<GetCategoriesRequest['response']>('/category/list');
    return response.data.data;
  }, [api]);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_CATEGORIES],
    queryFn: getCategories,
  });

  const getCategoriesFlattened = useCallback(async () => {
    const response = await api.get<GetCategoriesFlattenedRequest['response']>(
      '/category/flattened',
    );
    return response.data.data;
  }, [api]);

  const { data: categoriesFlattened, isLoading: isCategoriesFlattenedLoading } =
    useQuery({
      queryKey: [ReactQueryKeys.GET_CATEGORIES_FLATTENED],
      queryFn: getCategoriesFlattened,
    });

  const getCategoryById = useCallback(async () => {
    const response = await api.get<GetCategoryByIdRequest['response']>(
      `/category/${categoryId}`,
    );
    return response.data.data;
  }, [api, categoryId]);

  const { data: categoryById, isLoading: isCategoryByIdLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_CATEGORY_BY_ID, categoryId],
    queryFn: getCategoryById,
    enabled: !!categoryId,
  });

  return {
    // Queries
    categories,
    categoriesFlattened,
    categoryById,
    isCategoriesLoading,
    isCategoriesFlattenedLoading,
    isCategoryByIdLoading,
  };
}
