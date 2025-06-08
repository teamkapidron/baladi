import { Metadata } from 'next';

import PromotionBody from '@/components/dashboard/promotion/promotion-body';

export const metadata: Metadata = {
  title: 'Product Promotion Poster | Baladi',
};

export default function PromotionPage() {
  return (
    <div className="space-y-6">
      <PromotionBody />
    </div>
  );
}
