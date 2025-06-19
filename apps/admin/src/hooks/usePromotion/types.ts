import { ApiData } from '@/utils/types.util';

export type PosterType = 'new-arrival' | 'promotion';

export type PreviewPromotionPosterRequest = ApiData<
  {
    posterType: PosterType;
    productsIds: string[];
  },
  {
    html: string[];
  }
>;
