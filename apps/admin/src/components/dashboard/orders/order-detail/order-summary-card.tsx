'use client';

// Node Modules
import React, { memo } from 'react';
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  MapPin,
  AlertCircle,
  Mail,
} from '@repo/ui/lib/icons';

// Components
import DataItem from './atoms/data-item';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

// Types/Utils
import { formatDate } from '@repo/ui/lib/date';

interface OrderSummaryCardProps {
  orderId: string;
}

interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
}

function OrderSummaryCard({ orderId }: OrderSummaryCardProps) {
  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  if (!order) {
    return (
      <Card className="border-[var(--baladi-border)] shadow-lg">
        <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-muted)] to-white">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Ordre Sammendrag
          </h2>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-[var(--baladi-muted)]"></div>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                Laster ordre data...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--baladi-border)] shadow-lg">
      <CardHeader className="border-b border-[var(--baladi-border)]">
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
          Ordre Sammendrag
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Detaljert informasjon om ordren
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            <div className="from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 rounded-lg bg-gradient-to-r p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Ordre Detaljer
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DataItem
                  icon={<Calendar className="h-4 w-4" />}
                  label="Ordre Dato"
                  value={formatDate(new Date(order.createdAt), 'MMM d, yyyy')}
                />

                <DataItem
                  icon={<Clock className="h-4 w-4" />}
                  label="Sist Oppdatert"
                  value={formatDate(new Date(order.updatedAt), 'MMM d, yyyy')}
                />
              </div>
            </div>

            {/* Customer Information */}
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Kunde Informasjon
              </h3>

              <DataItem
                icon={<User className="h-4 w-4" />}
                label="Kunde"
                value={
                  <div className="space-y-1">
                    <div className="font-medium text-[var(--baladi-dark)]">
                      Kunde ID: {order.userId._id || 'Ukjent'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--baladi-gray)]">
                      <Mail className="h-3 w-3" />
                      Kontakt informasjon ikke tilgjengelig
                    </div>
                  </div>
                }
              />
            </div>

            {/* Payment Information */}
            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Betaling
              </h3>

              <DataItem
                icon={<CreditCard className="h-4 w-4" />}
                label="Betalingsstatus"
                value={
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="font-medium text-green-700">Fullført</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Right Column - Address & Additional Info */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Leveringsadresse
              </h3>

              <DataItem
                icon={<MapPin className="h-4 w-4" />}
                label="Adresse"
                value={
                  <div className="space-y-2">
                    <div className="font-medium text-[var(--baladi-dark)]">
                      {formatAddress(order.shippingAddress)}
                    </div>
                  </div>
                }
              />
            </div>

            {/* Order Value */}
            <div className="from-[var(--baladi-accent)]/10 rounded-lg bg-gradient-to-r to-orange-50 p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Ordre Verdi
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    Delsum
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                    {order.totalAmount?.toLocaleString('no-NO') || '0'} kr
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    Frakt
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                    Gratis
                  </span>
                </div>
                <div className="border-t border-[var(--baladi-border)] pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                      Total
                    </span>
                    <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                      {order.totalAmount?.toLocaleString('no-NO') || '0'} kr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Info */}
            {order.cancellationReason && (
              <div className="rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-red-100 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-1 h-5 w-5 text-red-500" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-red-800">
                      Kansellerings Årsak
                    </h4>
                    <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-red-700">
                      {order.cancellationReason}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(OrderSummaryCard);

function formatAddress(address: Address | undefined | null) {
  if (!address) return 'Ingen adresse oppgitt';

  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : 'Ingen adresse oppgitt';
}
