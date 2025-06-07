'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from '@repo/ui/lib/icons';

function getStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return (
        <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-yellow-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Pending</span>
        </div>
      );
    case 'confirmed':
      return (
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-600">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-medium">Confirmed</span>
        </div>
      );
    case 'shipped':
      return (
        <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-indigo-600">
          <Truck className="h-4 w-4" />
          <span className="text-sm font-medium">Shipped</span>
        </div>
      );
    case 'delivered':
      return (
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-medium">Delivered</span>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-red-600">
          <XCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Cancelled</span>
        </div>
      );
    default:
      return null;
  }
}

function OrderHeader() {
  const order = {
    _id: '1234567890',
    createdAt: '2021-01-01',
    status: 'pending',
  };

  return (
    <React.Fragment>
      <Link
        href="/profile?tab=orders"
        className="mb-6 inline-flex items-center text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-secondary)]"
      >
        <ArrowLeft size={16} className="mr-2" />
        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--color-primary)] after:transition-all after:duration-300 hover:after:w-full">
          Back to Orders
        </span>
      </Link>

      <div className="overflow-hidden bg-white shadow-sm">
        {/* Order header */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-[var(--color-background-light)] to-white p-6">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">
                Order #{order._id.slice(-5).toUpperCase()}
              </h1>
              <div className="mt-2 flex items-center gap-3 text-[var(--color-muted-foreground)]">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  Placed on{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">{getStatusBadge(order.status)}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(OrderHeader);
