'use client';

import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  ShoppingCart,
  Heart,
  Info,
  Package2,
  Check,
  BatteryFull,
  Bell,
  Percent,
  Calendar,
} from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding] = useState(false);
  const [isClient] = useState(false);
  const [isInCartState] = useState(false);
  const [isFavLoading] = useState(false);
  const [isFavoriteState] = useState(false);

  const product = {
    name: 'Product Name',
    shortDescription: 'Product Short Description',
    description: 'Product Description',
    vat: 25,
    stock: 10,
    imageUrl: 'https://via.placeholder.com/400',
    formattedPrice: '100 kr',
    expiryDate: '2025-01-01',
    unitsPerCarton: 10,
    weight: 100,
    dimensions: { length: 10, width: 10, height: 10 },
    sku: '1234567890',
  };

  const stockLevel = {
    text: 'På lager',
    color: 'text-green-600',
    icon: <BatteryFull size={18} className="mr-2 text-green-600" />,
  };

  const formattedPrice = '100 kr';

  const imageUrl = 'https://via.placeholder.com/400';

  const handleAddToCart = useCallback(() => {}, []);

  const handleToggleFavorite = useCallback(async () => {}, []);

  const handleNotifyMe = useCallback(() => {}, []);

  const expiryDate = useMemo(() => '2025-01-01', []);

  return (
    <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-2')}>
      <div className="flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#f8f8f8] to-[#fafafa]">
        <div className="relative flex h-[400px] w-full items-center justify-center">
          <Image
            width={400}
            height={400}
            src={imageUrl}
            alt={product.name}
            className="h-[400px] max-w-full object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
          {product.name}
        </h1>

        {product.shortDescription && (
          <p className="mb-6 text-[var(--color-muted-foreground)]">
            {product.shortDescription}
          </p>
        )}

        {/* Price and VAT */}
        <div className="my-6">
          <div className="text-2xl font-bold text-[var(--color-primary)]">
            {formattedPrice}
            <span className="ml-2 text-lg font-normal text-[var(--color-muted-foreground)]">
              per kartong
            </span>
          </div>
          {product.vat > 0 && (
            <div className="mt-1 flex items-center text-sm text-[var(--color-muted-foreground)]">
              <Info size={14} className="mr-1" />
              Inkluderer {product.vat}% MVA
            </div>
          )}
        </div>

        {/* Discount Information */}
        <div className="mb-4 flex items-center text-amber-700">
          <Percent size={18} className="mr-2 text-amber-600" />
          <span className="font-medium">
            5% rabatt ved kjøp av 3 eller flere kartonger
          </span>
        </div>

        {/* Stock Status with Visual Indicator */}
        <div className="mb-6">
          <div className="flex items-center">
            {stockLevel.icon}
            <span className={`font-medium ${stockLevel.color}`}>
              {stockLevel.text}
            </span>
          </div>
        </div>

        {/* Add to Cart and Wishlist */}
        <div className="space-y-4">
          <div className="flex w-auto items-center gap-4">
            {/* Quantity Controls - Only show if in stock */}
            {product.stock > 0 && (
              <QuantityInput
                value={quantity}
                onChange={setQuantity}
                disabled={isInCartState}
                max={product.stock || 99}
                size="lg"
              />
            )}

            {/* Add to Cart Button or Notify Me Button */}
            {product.stock > 0 ? (
              <Button
                size="lg"
                className="font-medium"
                onClick={handleAddToCart}
                isLoading={isAdding}
                iconLeft={
                  isClient && isInCartState ? <Check /> : <ShoppingCart />
                }
                variant={isClient && isInCartState ? 'success' : 'default'}
              >
                {isClient && isInCartState
                  ? 'Lagt i handlekurv'
                  : 'Legg i handlekurv'}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="default"
                className="font-medium"
                onClick={handleNotifyMe}
                iconLeft={<Bell />}
              >
                Varsle meg når tilgjengelig
              </Button>
            )}

            {/* Wishlist Button - Removed border and background */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300"
              disabled={isFavLoading}
              onClick={handleToggleFavorite}
              aria-label={
                isFavoriteState
                  ? 'Fjern fra favoritter'
                  : 'Legg til i favoritter'
              }
            >
              <Heart
                className={cn(
                  'h-5 w-5 transition-colors',
                  isClient && isFavoriteState
                    ? 'fill-current text-red-500'
                    : 'text-gray-500 hover:text-gray-700',
                )}
              />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 space-y-4 border-t border-[var(--color-border)] pt-6">
          <h3 className="font-medium text-[var(--color-text)]">
            Produktdetaljer
          </h3>

          <div className="grid grid-cols-1 gap-3 text-sm">
            {product.description && (
              <div className="text-[var(--color-muted-foreground)]">
                {product.description}
              </div>
            )}

            {product.sku && (
              <div className="flex items-start gap-2">
                <Info
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[var(--color-muted-foreground)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-text)]">
                    Varenummer:
                  </span>{' '}
                  {product.sku}
                </div>
              </div>
            )}

            {product.unitsPerCarton && (
              <div className="flex items-start gap-2">
                <Package2
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[var(--color-muted-foreground)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-text)]">
                    Enheter per kartong:
                  </span>{' '}
                  {product.unitsPerCarton}
                </div>
              </div>
            )}

            {expiryDate && (
              <div className="flex items-start gap-2">
                <Calendar
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[var(--color-muted-foreground)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-text)]">
                    Holdbarhet til:
                  </span>{' '}
                  {expiryDate}
                </div>
              </div>
            )}

            {product.weight && (
              <div className="flex items-start gap-2">
                <Package2
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[var(--color-muted-foreground)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-text)]">
                    Vekt:
                  </span>{' '}
                  {product.weight}g
                </div>
              </div>
            )}

            {product.dimensions && (
              <div className="flex items-start gap-2">
                <Package2
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[var(--color-muted-foreground)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-text)]">
                    Dimensjoner:
                  </span>{' '}
                  {product.dimensions.length} × {product.dimensions.width} ×{' '}
                  {product.dimensions.height} cm
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDetail);
