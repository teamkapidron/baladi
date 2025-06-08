import CustomerHeader from '@/components/dashboard/customers/customer-header';
import CustomerMetricCards from '@/components/dashboard/customers/customer-metric-cards';
import CustomersTable from '@/components/dashboard/customers/customer-table/customers-table';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <CustomerHeader />
      <CustomerMetricCards />
      <CustomersTable />
    </div>
  );
}
