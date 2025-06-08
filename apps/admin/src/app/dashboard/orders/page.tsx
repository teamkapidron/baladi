import { OrderAlert } from '@/components/dashboard/orders/order-alert';
import { OrderHeader } from '@/components/dashboard/orders/order-header';
import OrderList from '@/components/dashboard/orders/order-list';
import { OrderMetricCards } from '@/components/dashboard/orders/order-metric-card';

export default function OrdersPage() {
  return (
    <div className="space-y-6 p-5">
      <OrderAlert />
      <OrderHeader />
      <OrderMetricCards />
      <OrderList />
    </div>
  );
}
