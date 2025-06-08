import NewsletterMetrics from '@/components/dashboard/newsletter/newsletter-metrics';
import NewsletterProductSelection from '@/components/dashboard/newsletter/newsletter-product-selection';
import NewsletterCreator from '@/components/dashboard/newsletter/newsletter-creator';

export default function NewsletterPage() {
  return (
    <div className="space-y-6 p-5">
      <NewsletterMetrics />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NewsletterProductSelection />
        <NewsletterCreator />
      </div>
    </div>
  );
}
