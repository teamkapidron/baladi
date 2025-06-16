// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetFavoritesRequest,
  AddToFavoritesRequest,
  RemoveFromFavoritesRequest,
  Favorite,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useFavourite() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getFavorites = useCallback(async () => {
    const response =
      await api.get<GetFavoritesRequest['response']>('/favorite/my');
    return response.data.data;
  }, [api]);

  const { data: favorites, isLoading: isFavoritesLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_FAVORITES],
    queryFn: getFavorites,
  });

  const addToFavorites = useCallback(
    async (payload: AddToFavoritesRequest['payload']) => {
      const response = await api.post<AddToFavoritesRequest['response']>(
        `/favorite/${payload.productId}`,
      );
      return payload;
    },
    [api],
  );

  const addToFavoritesMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: function (newFavorite) {
      queryClient.setQueryData(
        [ReactQueryKeys.GET_FAVORITES],
        (old: { favorites: Favorite[] } | undefined) => {
          if (!old)
            return {
              data: {
                favorites: [
                  {
                    product: { _id: newFavorite.productId },
                  },
                ],
              },
            };

          const newData = {
            ...old,
            favorites: [
              ...old.favorites,
              { product: { _id: newFavorite.productId } },
            ],
          };

          return {
            ...newData,
          };
        },
      );
      toast.success('Product added to favorites');
    },
  });

  const removeFromFavorites = useCallback(
    async (payload: RemoveFromFavoritesRequest['payload']) => {
      const response = await api.delete<RemoveFromFavoritesRequest['response']>(
        `/favorite/${payload.productId}`,
      );
      return payload;
    },
    [api],
  );

  const removeFromFavoritesMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: function (payload) {
      queryClient.setQueryData(
        [ReactQueryKeys.GET_FAVORITES],
        (old: { favorites: Favorite[] } | undefined) => {
          if (!old) return { favorites: [] };

          return {
            ...old,
            favorites: old.favorites.filter(
              (f: Favorite) => f.product._id !== payload?.productId,
            ),
          };
        },
      );
      toast.success('Product removed from favorites');
    },
  });

  return {
    // Queries
    favorites,
    isFavoritesLoading,

    // Mutations
    addToFavoritesMutation,
    removeFromFavoritesMutation,
  };
}
