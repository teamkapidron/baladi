'use client';

// Node Modules
import React, { memo } from 'react';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

// Types/Utils
import { OrderStatus } from '@repo/types/order';

interface OrderActionsCardProps {
  orderId: string;
}

function OrderActionsCard(props: OrderActionsCardProps) {
  const { orderId } = props;

  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  const onUpdateStatus = (
    orderId: string,
    status: OrderStatus,
    reason?: string,
  ) => {
    console.log(orderId, status, reason);
  };

  return (
    <Card>
      <CardHeader className="border-b border-[var(--baladi-border)]">
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
          Ordre Handling
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Handter ordren
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {order?.status === OrderStatus.PENDING && (
          <>
            <Button
              variant="success"
              className="w-full justify-center"
              onClick={() => onUpdateStatus(order?._id, OrderStatus.CONFIRMED)}
            >
              Bekreft ordre
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50"
              onClick={() =>
                onUpdateStatus(
                  order?._id,
                  OrderStatus.CANCELLED,
                  'Cancelled by admin',
                )
              }
            >
              Avbryt ordre
            </Button>
          </>
        )}

        {order?.status === OrderStatus.CONFIRMED && (
          <Button
            variant="success"
            className="w-full justify-center"
            onClick={() => onUpdateStatus(order?._id, OrderStatus.SHIPPED)}
          >
            Merk som levert
          </Button>
        )}

        {order?.status === OrderStatus.SHIPPED && (
          <Button
            variant="success"
            className="w-full justify-center"
            onClick={() => onUpdateStatus(order?._id, OrderStatus.DELIVERED)}
          >
            Merk som levert
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(OrderActionsCard);
