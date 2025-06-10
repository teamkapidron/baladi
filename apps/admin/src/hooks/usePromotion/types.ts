import { ApiData } from '@/utils/types.util';

export type PosterType = 'new-arrival' | 'discounted';

export type PreviewPromotionPosterRequest = ApiData<
  {
    posterType: PosterType;
    productsIds: string[];
  },
  {
    html: string[];
  }
>;
