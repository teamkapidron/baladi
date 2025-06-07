'use client';

import React, { memo } from 'react';
import { CheckCircle2, XCircle, Truck } from '@repo/ui/lib/icons';

const trackingData = {
  trackingNumber: 'TRK12345678NO',
  carrier: 'PostNord',
  estimatedDelivery: new Date('2023-05-18'),
  trackingEvents: [
    {
      date: new Date('2023-05-18T15:30:00'),
      location: 'Oslo, Norway',
      status: 'Delivered',
      description: 'Package delivered',
    },
    {
      date: new Date('2023-05-18T08:15:00'),
      location: 'Oslo, Norway',
      status: 'Out for Delivery',
      description: 'Package is out for delivery',
    },
    {
      date: new Date('2023-05-17T19:40:00'),
      location: 'Oslo Distribution Center',
      status: 'Arrived at Distribution Center',
      description: 'Package arrived at local facility',
    },
    {
      date: new Date('2023-05-16T11:25:00'),
      location: 'Bergen, Norway',
      status: 'In Transit',
      description: 'Package is in transit',
    },
    {
      date: new Date('2023-05-15T14:50:00'),
      location: 'Bergen, Norway',
      status: 'Shipped',
      description: 'Package has been shipped',
    },
  ],
};

function OrderTimeline() {
  const status = 'delivered';

  if (status === 'delivered') {
    return (
      <div className="mt-8 border border-red-100 bg-red-50 p-6">
        <div className="mb-2 flex items-center gap-3 text-red-700">
          <XCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Order Cancelled</h3>
        </div>
        <p className="text-red-700">
          This order has been cancelled. Please contact customer support if you
          have any questions.
        </p>
      </div>
    );
  }

  // For delivered orders, show tracking details
  const showTracking = status === 'shipped' || status === 'delivered';

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          Order Timeline
        </h3>
        {showTracking && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
            <span>Tracking Number:</span>
            <span className="font-medium text-[var(--color-primary)]">
              {trackingData.trackingNumber}
            </span>
          </div>
        )}
      </div>

      {showTracking ? (
        <div className="space-y-6">
          {trackingData.trackingEvents.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    index === 0
                      ? 'bg-[var(--color-primary)]'
                      : 'border-2 border-gray-300 bg-white'
                  }`}
                >
                  {index === 0 && (
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  )}
                </div>
                {index < trackingData.trackingEvents.length - 1 && (
                  <div className="mt-1 h-full w-0.5 bg-gray-200"></div>
                )}
              </div>

              <div
                className={`pb-6 ${index === trackingData.trackingEvents.length - 1 ? 'pb-0' : ''}`}
              >
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p
                      className={`font-medium ${index === 0 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}
                    >
                      {event.status}
                    </p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      {event.description}
                    </p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      {event.location}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    {event.date.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative border border-dashed border-gray-300 bg-gray-50 p-6">
          <div className="flex flex-col items-center space-y-3 text-center">
            <Truck className="h-10 w-10 text-[var(--color-muted-foreground)]" />
            <h4 className="text-lg font-medium text-[var(--color-text)]">
              Tracking Information
            </h4>
            <p className="max-w-md text-[var(--color-muted-foreground)]">
              Tracking information will be available once your order has been
              shipped. We&apos;ll notify you when your order is on its way!
            </p>
            <div className="mt-2 h-2 w-full max-w-md rounded-full bg-gray-100">
              <div
                className={`order-timeline-progress ${
                  status === 'pending'
                    ? 'order-timeline-progress-pending'
                    : status === 'confirmed'
                      ? 'order-timeline-progress-confirmed'
                      : status === 'shipped'
                        ? 'order-timeline-progress-shipped'
                        : status === 'delivered'
                          ? 'order-timeline-progress-delivered'
                          : ''
                }`}
              ></div>
            </div>
            <div className="flex w-full max-w-md justify-between px-1 text-xs text-[var(--color-muted-foreground)]">
              <span>Order Placed</span>
              <span>Confirmed</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(OrderTimeline);
