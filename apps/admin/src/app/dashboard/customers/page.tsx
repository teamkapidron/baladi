import { Suspense } from 'react';
import CustomerMetricCards from '@/components/dashboard/customers/customer-metric-cards';
import CustomersTable from '@/components/dashboard/customers/customer-table/customers-table';

export default function CustomersPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <CustomerMetricCards />
        <CustomersTable />
      </div>
    </Suspense>
  );
}
