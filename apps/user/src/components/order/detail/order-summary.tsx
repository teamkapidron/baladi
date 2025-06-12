'use client';

// Node Modules
import React, { memo } from 'react';
import {
  Receipt,
  CreditCard,
  Shield,
  Download,
  Mail,
  CheckCircle,
} from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';

// Types/Utils
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderSummaryProps {
  order: OrderResponse;
}

function OrderSummary({ order }: OrderSummaryProps) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const vatRate = 0.25;
  const vatAmount = (subtotal * vatRate) / (1 + vatRate);
  const subtotalExVat = subtotal - vatAmount;
  const shippingCost = 0;

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Receipt size={16} className="text-[var(--baladi-primary)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Bestillingssammendrag
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--baladi-gray)]">
              Subtotal (ekskl. mva)
            </span>
            <span className="font-medium text-[var(--baladi-dark)]">
              {formatPrice(subtotalExVat)} kr
            </span>
          </div>

          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--baladi-gray)]">MVA (25%)</span>
            <span className="font-medium text-[var(--baladi-dark)]">
              {formatPrice(vatAmount)} kr
            </span>
          </div>

          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--baladi-gray)]">Frakt</span>
            <span className="font-medium text-[var(--baladi-dark)]">
              {shippingCost > 0 ? `${formatPrice(shippingCost)} kr` : 'Gratis'}
            </span>
          </div>

          {/* {discountAmount && discountAmount > 0 && (
            <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
              <span className="text-green-600">Rabatt</span>
              <span className="font-medium text-green-600">
                -{formatPrice(discountAmount)} kr
              </span>
            </div>
          )} */}

          <Separator />

          <div className="flex justify-between">
            <span className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
              Totalt
            </span>
            <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
              {formatPrice(order.totalAmount)} kr
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-[var(--baladi-secondary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <CreditCard size={16} className="text-[var(--baladi-secondary)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Betalingsinformasjon
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Betalingsmetode
            </span>
            <Badge className="bg-[var(--baladi-light)] text-[var(--baladi-dark)]">
              Faktura
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Betalingsstatus
            </span>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle size={12} className="mr-1" />
              Betalt
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Transaksjons-ID
            </span>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
              {order._id.slice(-12).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="from-[var(--baladi-light)]/30 to-[var(--baladi-primary)]/5 rounded-lg bg-gradient-to-r p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[var(--baladi-primary)]" />
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
              Sikker betaling med SSL-kryptering
            </span>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Download size={16} className="mr-2" />
              Last ned kvittering (PDF)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Mail size={16} className="mr-2" />
              Send kvittering på e-post
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="mb-3 font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
          Trenger du hjelp?
        </h4>
        <div className="space-y-2 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          <p>
            <strong>Telefon:</strong> 22 33 44 55
          </p>
          <p>
            <strong>E-post:</strong> hjelp@baladi.no
          </p>
          <p>
            <strong>Åpningstider:</strong> Man-Fre 08:00-16:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderSummary);
