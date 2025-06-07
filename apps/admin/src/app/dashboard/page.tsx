import QuickLinks from '@/components/dashboard/home/quick-links';
import RevenueOrderChart from '@/components/dashboard/home/revenue-order-chart';
import { CustomerRegistrationChart } from '@/components/dashboard/home/customer-registration-chart';
import { OrderStatusChart } from '@/components/dashboard/home/order-status-chart';
import { TopCustomers } from '@/components/dashboard/home/top-customers';
import { TopProducts } from '@/components/dashboard/home/top-products';

export default function DashboardPage() {
  return (
    <div className="space-y-6 py-5">
      <div className="space-y-6 px-5">
        <QuickLinks />
        <RevenueOrderChart />
      </div>
      <div className="grid grid-cols-1 gap-6 px-5 lg:grid-cols-2">
        <OrderStatusChart />
        <CustomerRegistrationChart />
      </div>
      <div className="grid grid-cols-1 gap-6 px-5 lg:grid-cols-2">
        <TopProducts />
        <TopCustomers />
      </div>
    </div>
  );
}
