import { Metadata } from 'next';
import { Suspense } from 'react';

import DiscountsHeader from '@/components/dashboard/discounts/discounts-header';
import DiscountsMetrics from '@/components/dashboard/discounts/discounts-metrics';
import DiscountsTable from '@/components/dashboard/discounts/discounts-table';

export const metadata: Metadata = {
  title: 'Discounts',
};

export default function DiscountsPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <DiscountsHeader />
        <DiscountsMetrics />
        <DiscountsTable />
      </div>
    </Suspense>
  );
}
