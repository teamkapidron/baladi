// Node Modules
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type { PreviewPromotionPosterRequest } from './types';
import { flagPosterTemplate } from '@/templates/poster.template';

export function usePoster() {
  const api = useRequest();

  const previewFlagPoster = useCallback(
    async (
      request: PreviewPromotionPosterRequest['payload'] & {
        title: string;
      },
    ) => {
      const response = await api.post<
        PreviewPromotionPosterRequest['response']
      >('/marketing/promotion/poster/preview', request);

      const flagPosterPromises = response.data.data.productsData.map(
        (product, index) =>
          flagPosterTemplate({
            ...product,
            title: `${request.title}-${product.name}`,
            countryCode: product.countryCode,
          }),
      );

      await Promise.all(flagPosterPromises);

      return response.data.data.productsData.length;
    },
    [api],
  );

  const previewFlagPosterMutation = useMutation({
    mutationKey: [ReactQueryKeys.PREVIEW_FLAG_POSTER],
    mutationFn: previewFlagPoster,
  });

  return {
    // Mutations
    previewFlagPosterMutation,
  };
}
