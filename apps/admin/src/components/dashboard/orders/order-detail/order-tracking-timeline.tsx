import React from 'react';
import {
  Clock,
  CheckCircle,
  TruckIcon,
  PackageIcon,
  XCircle,
} from '@repo/ui/lib/icons';
import { OrderStatus } from '@repo/types/order';
import { Card } from '@repo/ui/components/base/card';
import { CardHeader } from '@repo/ui/components/base/card';
import { CardContent } from '@repo/ui/components/base/card';

// Format date function
const formatDate = (date: Date) => {
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// Get status icon
const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <Clock className="h-5 w-5" />;
    case OrderStatus.CONFIRMED:
      return <CheckCircle className="h-5 w-5" />;
    case OrderStatus.SHIPPED:
      return <TruckIcon className="h-5 w-5" />;
    case OrderStatus.DELIVERED:
      return <PackageIcon className="h-5 w-5" />;
    case OrderStatus.CANCELLED:
      return <XCircle className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function OrderTrackingTimeline() {
  const id = '3489';

  const order = {
    _id: id,
    status: OrderStatus.PENDING,
    createdAt: new Date(),
  };

  // Define order statuses for timeline
  const orderStatuses = [
    { status: OrderStatus.PENDING, label: 'Order Placed' },
    { status: OrderStatus.CONFIRMED, label: 'Order Confirmed' },
    { status: OrderStatus.SHIPPED, label: 'Order Shipped' },
    { status: OrderStatus.DELIVERED, label: 'Order Delivered' },
  ];

  // Find current status index
  const currentStatusIndex = orderStatuses.findIndex(
    (s) => s.status === order.status,
  );

  return (
    <Card>
      <CardHeader title="Order Tracking" />

      <CardContent className="pt-8">
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline steps */}
          <div className="space-y-8">
            {orderStatuses.map((step, index) => {
              const isActive = currentStatusIndex >= index;
              const isPast = currentStatusIndex > index;
              return (
                <div key={step.status} className="relative flex items-start">
                  <div
                    className={`z-10 flex h-12 w-12 items-center justify-center ${
                      isActive
                        ? isPast
                          ? 'bg-green-100 text-green-600 outline-4 outline-green-50'
                          : 'bg-primary/10 text-primary outline-primary/5 outline-4'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="ml-6 pt-1">
                    <h3
                      className={`text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                      {step.label}
                    </h3>
                    {isActive && (
                      <p className="mt-1 text-sm text-gray-500">
                        {index === currentStatusIndex
                          ? `Updated on ${formatDate(new Date(order.createdAt))}`
                          : `Completed`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {order.status === OrderStatus.CANCELLED && (
              <div className="relative flex items-start">
                <div className="z-10 flex h-12 w-12 items-center justify-center bg-red-100 text-red-600 outline-4 outline-red-50">
                  <XCircle className="h-5 w-5" />
                </div>
                <div className="ml-6 pt-1">
                  <h3 className="text-base font-medium text-red-600">
                    Order Cancelled
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Cancelled on {formatDate(new Date(order.createdAt))}
                  </p>
                  {/* {order.cancellationReason && (
                    <p className="mt-1 bg-red-50 px-3 py-1.5 text-sm text-red-600">
                      Reason: {order.cancellationReason}
                    </p>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
