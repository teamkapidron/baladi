'use client';

// Node Modules
import { memo } from 'react';
import { useRouter } from 'next/navigation';

// Components
import OrderForm from '@/components/dashboard/orders/new/order-form/order-form';
import { OrderFormValues } from '@/components/dashboard/orders/new/order-form/schema';

// Hooks
import { useCreateOrder } from '@/hooks/useOrder/useCreateOrder';

function NewOrder() {
  const { createOrderMutation } = useCreateOrder();
  const router = useRouter();

  function onSubmit(data: OrderFormValues) {
    createOrderMutation.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/orders');
      },
    });
  }

  return (
    <div className="bg-background rounded-xl p-5 shadow-md">
      <OrderForm
        onSubmit={onSubmit}
        isPending={createOrderMutation.isPending}
      />
    </div>
  );
}

export default memo(NewOrder);
