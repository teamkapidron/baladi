import OrderDetailHeader from '@/components/dashboard/orders/order-detail/order-detail-header';
import OrderSummaryCard from '@/components/dashboard/orders/order-detail/order-summary-card';
import OrderTrackingTimeline from '@/components/dashboard/orders/order-detail/order-tracking-timeline';
import OrderItemsList from '@/components/dashboard/orders/order-detail/order-items-list';
import CustomerInfoCard from '@/components/dashboard/orders/order-detail/customer-info-card';
import OrderActionsCard from '@/components/dashboard/orders/order-detail/order-actions-card';

export default function OrderPage() {
  return (
    <div className="space-y-6">
      <OrderDetailHeader />
      <OrderTrackingTimeline />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <OrderSummaryCard />
          <OrderItemsList />
        </div>
        <div className="space-y-6">
          <OrderActionsCard />
          <CustomerInfoCard />
        </div>
      </div>
    </div>
  );
}
