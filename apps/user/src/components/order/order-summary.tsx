'use client';

import React from 'react';
import { ShoppingBag, CreditCard, MapPin, Truck } from '@repo/ui/lib/icons';
import { OrderItem } from '@repo/types/order';

function OrderSummary() {
  const order = {
    items: [
      { quantity: 1, totalPrice: 100 },
      { quantity: 2, totalPrice: 200 },
    ],
    totalAmount: 300,
    shippingAddress: { city: 'Oslo', country: 'Norway' },
  };

  const itemsCount = 10;
  const totalAmount = 300;
  const totalWithTax = totalAmount * 1.05;

  const shippingAddress = order.shippingAddress || {};
  const shippingLocation =
    shippingAddress.city && shippingAddress.country
      ? `${shippingAddress.city}, ${shippingAddress.country}`
      : 'Not specified';

  return (
    <div className="border-b border-gray-100 bg-white p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex items-start gap-3">
          <ShoppingBag className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Items
            </h3>
            <p className="font-medium text-[var(--color-text)]">
              {itemsCount} item(s)
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CreditCard className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Payment
            </h3>
            <p className="font-medium text-[var(--color-text)]">
              ${totalWithTax.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Shipping Address
            </h3>
            <p className="font-medium text-[var(--color-text)]">
              {shippingLocation}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Shipping Method
            </h3>
            <p className="font-medium text-[var(--color-text)]">
              Standard Shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
