'use client';

import React, { memo } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  TruckIcon,
  PackageIcon,
  XCircle,
  Clock,
  ChevronRight,
  MoreHorizontal,
} from '@repo/ui/lib/icons';
import { Order, OrderStatus } from '@repo/types/order';
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import { useParams, useRouter } from 'next/navigation';

const formatDate = (date: Date) => {
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return (
        <Badge variant="default">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case OrderStatus.CONFIRMED:
      return (
        <Badge variant="default">
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirmed
        </Badge>
      );
    case OrderStatus.SHIPPED:
      return (
        <Badge variant="default">
          <TruckIcon className="mr-1 h-3 w-3" />
          Shipped
        </Badge>
      );
    case OrderStatus.DELIVERED:
      return (
        <Badge variant="default">
          <PackageIcon className="mr-1 h-3 w-3" />
          Delivered
        </Badge>
      );
    case OrderStatus.CANCELLED:
      return (
        <Badge variant="default">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return null;
  }
};

interface OrderDetailHeaderProps {
  order: Order;
  onBackClick: () => void;
}

function OrderDetailHeader() {
  const router = useRouter();
  const id = '3489';

  const order = {
    _id: id,
    status: OrderStatus.PENDING,
    createdAt: new Date(),
  };

  const displayOrderId = `#${id.substring(id.length - 8).toUpperCase()}`;

  return (
    <div className="border-border mb-6 border bg-white shadow-sm">
      {/* Breadcrumb navigation */}
      <div className="border-border border-b px-5 py-3">
        <div className="flex items-center text-sm">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Orders
          </button>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{displayOrderId}</span>
        </div>
      </div>

      {/* Main header content */}
      <div className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Order {displayOrderId}
            </h1>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-sm text-gray-500">
            Placed on {formatDate(new Date(order.createdAt))}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm">
            Print
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <button className="p-2 hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderDetailHeader);
