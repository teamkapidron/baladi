'use client';

// Node Modules
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import React, { memo, useState } from 'react';
import {
  ShoppingCart,
  Truck,
  Clock,
  Shield,
  CreditCard,
  Info,
  Tag,
  ArrowRight,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

// Utils
import { formatPrice } from '@/utils/price.util';

function CartSummary() {
  const { isAuthenticated } = useAuth();
  const { userCartItems, cartSummary } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<
    'standard' | 'express'
  >('standard');

  if (!isAuthenticated || !userCartItems || userCartItems.length === 0) {
    return null;
  }

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard levering',
      description: '3-5 virkedager',
      price: cartSummary.totalPrice >= 1000 ? 0 : 149,
      icon: <Truck size={18} className="text-[var(--baladi-primary)]" />,
    },
    {
      id: 'express',
      name: 'Ekspresslevering',
      description: 'Neste virkedag',
      price: 299,
      icon: <Clock size={18} className="text-[var(--baladi-secondary)]" />,
    },
  ];

  const selectedOption = deliveryOptions.find(
    (option) => option.id === selectedDelivery,
  );
  const deliveryPrice = selectedOption?.price || 0;
  const totalWithDelivery = cartSummary.totalPrice + deliveryPrice;

  const savings =
    cartSummary.totalPrice >= 1000 && selectedDelivery === 'standard' ? 149 : 0;

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <ShoppingCart size={16} className="text-[var(--baladi-primary)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Bestillingssammendrag
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--baladi-gray)]">
              Varer ({userCartItems.length})
            </span>
            <span className="font-medium text-[var(--baladi-dark)]">
              {formatPrice(cartSummary.totalPrice)} kr
            </span>
          </div>

          {/* {cartSummary.discountAmount > 0 && (
            <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
              <span className="text-green-600">Rabatt</span>
              <span className="font-medium text-green-600">
                -{formatPrice(cartSummary.discountAmount)} kr
              </span>
            </div>
          )} */}

          {/* <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--baladi-gray)]">MVA (25%)</span>
            <span className="font-medium text-[var(--baladi-dark)]">
              {formatPrice(cartSummary.vatAmount)} kr
            </span>
          </div> */}

          <Separator />

          <div className="flex justify-between font-[family-name:var(--font-sora)] text-lg">
            <span className="font-semibold text-[var(--baladi-dark)]">
              Subtotal
            </span>
            <span className="font-bold text-[var(--baladi-primary)]">
              {formatPrice(cartSummary.totalPrice)} kr
            </span>
          </div>
        </div>

        {/* Free Shipping Alert */}
        {cartSummary.totalPrice >= 1000 && (
          <div className="mt-4 rounded-lg bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-green-600" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-green-800">
                Du får gratis standardlevering!
              </span>
            </div>
          </div>
        )}

        {/* Progress to Free Shipping */}
        {cartSummary.totalPrice < 1000 && (
          <div className="bg-[var(--baladi-light)]/50 mt-4 rounded-lg p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
                Handel for {formatPrice(1000 - cartSummary.totalPrice)} kr til
                for gratis levering
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--baladi-border)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] transition-all duration-300"
                style={{
                  width: `${Math.min((cartSummary.totalPrice / 1000) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Delivery Options */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Leveringsalternativer
        </h3>

        <div className="space-y-3">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={cn(
                'cursor-pointer rounded-lg border-2 p-4 transition-all',
                selectedDelivery === option.id
                  ? 'bg-[var(--baladi-primary)]/5 border-[var(--baladi-primary)]'
                  : 'hover:border-[var(--baladi-primary)]/50 border-[var(--baladi-border)]',
              )}
              onClick={() =>
                setSelectedDelivery(option.id as 'standard' | 'express')
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {option.icon}
                  <div>
                    <div className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                      {option.name}
                    </div>
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      {option.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {option.price === 0 ? (
                    <Badge className="bg-green-100 text-green-800">
                      Gratis
                    </Badge>
                  ) : (
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                      {formatPrice(option.price)} kr
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {savings > 0 && (
          <div className="mt-3 rounded-lg bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-green-600" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-green-800">
                Du sparer {formatPrice(savings)} kr på levering!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Final Total */}
      <div className="bg-[var(--baladi-primary)]/5 rounded-lg p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Levering
          </span>
          <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
            {deliveryPrice === 0
              ? 'Gratis'
              : `${formatPrice(deliveryPrice)} kr`}
          </span>
        </div>

        <Separator />

        <div className="mt-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Totalt
          </span>
          <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-primary)]">
            {formatPrice(totalWithDelivery)} kr
          </span>
        </div>

        {/* <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Inkludert {formatPrice(cartSummary.vatAmount)} kr i MVA
        </p> */}
      </div>

      {/* Checkout Button */}
      <Button
        size="lg"
        className="w-full font-[family-name:var(--font-dm-sans)] font-semibold"
      >
        <CreditCard size={20} className="mr-2" />
        Gå til kassen
        <ArrowRight size={16} className="ml-2" />
      </Button>

      {/* Security Info */}
      <div className="bg-[var(--baladi-light)]/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-[var(--baladi-primary)]" />
          <div>
            <h4 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
              Sikker betaling
            </h4>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              SSL-kryptert og sikker betalingsløsning
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 text-[var(--baladi-primary)]" />
          <div>
            <h4 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
              Trenger du hjelp?
            </h4>
            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Ring oss på{' '}
              <Link
                href="tel:+4722334455"
                className="text-[var(--baladi-primary)] hover:underline"
              >
                22 33 44 55
              </Link>{' '}
              eller send e-post til{' '}
              <Link
                href="mailto:hjelp@baladi.no"
                className="text-[var(--baladi-primary)] hover:underline"
              >
                hjelp@baladi.no
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartSummary);
