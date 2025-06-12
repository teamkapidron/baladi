'use client';

import React, { memo, useCallback } from 'react';
import { MapPin, Truck, Phone, Clock, Package } from '@repo/ui/lib/icons';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderDeliveryProps {
  order: OrderResponse;
}

function OrderDelivery({ order }: OrderDeliveryProps) {
  const getEstimatedDelivery = useCallback(() => {
    const orderDate = new Date(order.createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 5);
    return deliveryDate;
  }, [order.createdAt]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-[var(--baladi-accent)]/10 flex h-8 w-8 items-center justify-center rounded-full">
          <Truck size={16} className="text-[var(--baladi-accent)]" />
        </div>
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Leveringsinformasjon
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--baladi-primary)]" />
            <h4 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Leveringsadresse
            </h4>
          </div>

          <div className="ml-6 space-y-1 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            <p className="font-medium text-[var(--baladi-dark)]">
              {order.shippingAddress.addressLine1}
            </p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>
              {order.shippingAddress.postalCode} {order.shippingAddress.city}
            </p>
            <p>{order.shippingAddress.state}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-[var(--baladi-secondary)]" />
            <h4 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Leveringsdetaljer
            </h4>
          </div>

          <div className="ml-6 space-y-3">
            <div className="flex items-center gap-3">
              <Clock size={14} className="text-[var(--baladi-gray)]" />
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  Forventet levering
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  {formatDate(getEstimatedDelivery())}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck size={14} className="text-[var(--baladi-gray)]" />
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  Leveringsmetode
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Standard levering (3-5 virkedager)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={14} className="text-[var(--baladi-gray)]" />
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  Leveringsinstrukser
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  {order.notes || 'Ingen spesielle instrukser'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="from-[var(--baladi-light)]/30 to-[var(--baladi-accent)]/5 mt-6 rounded-lg bg-gradient-to-r p-4">
        <div className="flex items-start gap-3">
          <div className="bg-[var(--baladi-accent)]/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
            <Package size={16} className="text-[var(--baladi-accent)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
              Viktig leveringsinformasjon
            </p>
            <ul className="mt-2 space-y-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              <li>• Varer leveres på hverdager mellom 08:00-16:00</li>
              <li>• Du vil motta SMS/e-post når pakken er på vei</li>
              <li>• Sørg for at noen er tilstede for mottak av pakken</li>
              <li>• Ved problemer, ring oss på 22 33 44 55</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderDelivery);
