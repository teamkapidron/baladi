'use client';

import React from 'react';
import { Separator } from '@repo/ui/components/base/separator';
import { Button } from '@repo/ui/components/base/button';
import { MapPin, CreditCard, Package } from '@repo/ui/lib/icons';
import { OrderItem } from '@repo/types/order';

function OrderDetails() {
  const order = {
    _id: '1234567890',
    items: [
      { productID: '123', quantity: 1, price: 100, totalPrice: 100 },
      { productID: '456', quantity: 2, price: 200, totalPrice: 400 },
    ],
    totalAmount: 500,
    status: 'pending',
    shippingAddress: {
      addressLine1: '123 Main St',
      addressLine2: 'Apt 1',
      postalCode: '12345',
      city: 'Anytown',
      country: 'USA',
    },
    userID: { name: 'John Doe' },
  };

  const subtotal = 500;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const shippingAddress = order.shippingAddress || {};

  return (
    <div>
      <div className="border border-gray-100 bg-[var(--color-background-light)] p-6">
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between py-2">
            <span className="text-[var(--color-muted-foreground)]">
              Subtotal
            </span>
            <span className="text-[var(--color-text)]">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[var(--color-muted-foreground)]">
              Shipping
            </span>
            <span className="text-[var(--color-text)]">$0.00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[var(--color-muted-foreground)]">Tax</span>
            <span className="text-[var(--color-text)]">${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between py-2 text-lg font-medium">
            <span>Total</span>
            <span className="text-[var(--color-primary)]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {order.shippingAddress && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
              <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
              Shipping Address
            </h3>
            <div className="border border-gray-100 bg-white p-4 text-sm text-[var(--color-muted-foreground)]">
              <p className="font-medium text-[var(--color-text)]">
                {order.userID?.name || 'Customer'}
              </p>
              <p>{shippingAddress.addressLine1 || ''}</p>
              <p>{shippingAddress.addressLine2 || ''}</p>
              <p>
                {shippingAddress.city || ''}, {shippingAddress.postalCode || ''}
              </p>
              <p>{shippingAddress.country || ''}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
            <CreditCard className="h-5 w-5 text-[var(--color-primary)]" />
            Payment Method
          </h3>
          <div className="border border-gray-100 bg-white p-4 text-sm text-[var(--color-muted-foreground)]">
            <p className="flex justify-between">
              <span>Credit Card</span>
              <span className="font-medium text-[var(--color-text)]">
                **** 4242
              </span>
            </p>
          </div>
        </div>

        <Button className="mt-6 w-full bg-[var(--color-primary)] transition-colors duration-200 hover:bg-[var(--color-secondary)]">
          <Package size={16} className="mr-2" />
          Download Invoice
        </Button>
      </div>
    </div>
  );
}

export default OrderDetails;
