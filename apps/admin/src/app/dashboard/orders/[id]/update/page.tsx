import { Metadata } from 'next';

import UpdateOrderHeader from '@/components/dashboard/orders/update/update-order-header';
import UpdateOrderItemsList from '@/components/dashboard/orders/update/update-order-items-list';
import CustomerInfoCard from '@/components/dashboard/orders/order-detail/customer-info-card';

export const metadata: Metadata = {
  title: 'Oppdater Ordre',
};

interface UpdateOrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateOrderPage(props: UpdateOrderPageProps) {
  const { id } = await props.params;

  return (
    <div className="space-y-6">
      <UpdateOrderHeader orderId={id} />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <UpdateOrderItemsList orderId={id} />
        </div>
        <div className="space-y-6">
          <CustomerInfoCard orderId={id} />
        </div>
      </div>
    </div>
  );
}
