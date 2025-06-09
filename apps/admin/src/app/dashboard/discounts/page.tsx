import { Suspense } from 'react';

import DiscountsHeader from '@/components/dashboard/discounts/discounts-header';
import DiscountsMetrics from '@/components/dashboard/discounts/discounts-metrics';
import DiscountsTable from '@/components/dashboard/discounts/discounts-table';

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
