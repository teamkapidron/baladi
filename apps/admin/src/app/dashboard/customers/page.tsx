import { CustomerAlert } from '@/components/dashboard/customers/customer-alert';
import { CustomerHeader } from '@/components/dashboard/customers/customer-header';
import { CustomerMetricCards } from '@/components/dashboard/customers/customer-metric-cards';
import CustomersTable from '@/components/dashboard/customers/customers-table';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <CustomerAlert />
      <CustomerHeader />
      <CustomerMetricCards />
      <CustomersTable />
    </div>
  );
}
