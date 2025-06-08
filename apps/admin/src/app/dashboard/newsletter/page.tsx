import { Metadata } from 'next';

import NewsletterMetrics from '@/components/dashboard/newsletter/newsletter-metrics';
import NewsletterBody from '@/components/dashboard/newsletter/newsletter-body';

export const metadata: Metadata = {
  title: 'Newsletter | Baladi',
};

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <NewsletterMetrics />
      <NewsletterBody />
    </div>
  );
}
