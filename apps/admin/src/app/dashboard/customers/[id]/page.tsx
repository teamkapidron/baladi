import CustomerDetailHeader from '@/components/dashboard/customers/customer-detail/customer-detail-header';
import CustomerCompanyInfo from '@/components/dashboard/customers/customer-detail/customer-company-info';
import CustomerVerificationStatus from '@/components/dashboard/customers/customer-detail/customer-verification-status';
import CustomerInfo from '@/components/dashboard/customers/customer-detail/customer-info';

export default function CustomerDetailPage() {
  return (
    <div className="space-y-6">
      <CustomerDetailHeader />
      <CustomerVerificationStatus />
      <CustomerInfo />
      <CustomerCompanyInfo />
    </div>
  );
}
