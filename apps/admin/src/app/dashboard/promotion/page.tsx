import PromotionProductSelection from '@/components/dashboard/promotion/promotion-product-selection';
import PromotionPosterCreator from '@/components/dashboard/promotion/promotion-poster-creator';

export default function PromotionPage() {
  return (
    <div className="space-y-6 p-5">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PromotionProductSelection />
        <PromotionPosterCreator />
      </div>
    </div>
  );
}
