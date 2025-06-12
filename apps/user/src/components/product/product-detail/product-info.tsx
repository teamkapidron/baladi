'use client';

// Node Modules
import React, { useState, memo, useMemo, useCallback } from 'react';
import {
  ShoppingCart,
  Package2,
  Shield,
  Truck,
  Check,
  Bell,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useParams } from 'next/navigation';
import { useProductBySlug } from '@/hooks/useProduct';

// Utils
import { formatPrice } from '@/utils/price.util';

function ProductInfo() {
  const { slug } = useParams<{ slug: string }>();

  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { data: productData, isLoading } = useProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);

  const { product, isProductInCart, isOutOfStock } = useMemo(() => {
    if (!productData?.product) return { product: null, isInCart: false };

    return {
      product: productData?.product,
      isProductInCart: isInCart(productData?.product?._id),
      isOutOfStock: productData?.product?.stock <= 0,
    };
  }, [isInCart, productData?.product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    addToCart(product, quantity);
  }, [addToCart, product, quantity]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--baladi-light)]" />
          <div className="h-6 w-full animate-pulse rounded bg-[var(--baladi-light)]" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-[var(--baladi-light)]" />
        </div>

        <div className="space-y-2">
          <div className="h-10 w-48 animate-pulse rounded bg-[var(--baladi-light)]" />
          <div className="h-5 w-32 animate-pulse rounded bg-[var(--baladi-light)]" />
        </div>

        <div className="space-y-4">
          <div className="h-12 w-full animate-pulse rounded bg-[var(--baladi-light)]" />
          <div className="flex gap-4">
            <div className="h-12 w-32 animate-pulse rounded bg-[var(--baladi-light)]" />
            <div className="h-12 flex-1 animate-pulse rounded bg-[var(--baladi-light)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)] lg:text-3xl">
          {product?.name}
        </h1>

        <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
          {product?.shortDescription}
        </p>
      </div>

      <div className="bg-[var(--baladi-light)]/50 space-y-4 rounded-lg p-4">
        <div className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-primary)]">
            {formatPrice(product?.salePrice ?? 0)} kr
          </span>
        </div>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Pris inkluderer {product?.vat}% MVA
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Package2 size={18} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
            <strong>Kartong:</strong> {product?.noOfUnits} enheter
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Shield size={18} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
            Sikker B2B Bestilling
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Truck size={18} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
            Tilgjengelig for Neste-Dag Levering
          </span>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <QuantityInput
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={Math.min(99, product?.stock ?? 0)}
              disabled={isOutOfStock}
              size="lg"
            />
          </div>
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            {product?.stock} enheter tilgjengelige
          </span>
        </div>

        <div className="flex gap-3">
          {isAuthenticated ? (
            !isOutOfStock ? (
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={isProductInCart}
                className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
              >
                {isProductInCart ? (
                  <div className="flex items-center gap-2">
                    <Check size={18} />I handlekurven
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} />
                    Legg til i Handlekurv •{' '}
                    {formatPrice((product?.salePrice ?? 0) * quantity)} kr
                  </div>
                )}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
                disabled
              >
                <Bell size={18} />
                Varsle meg når tilgjengelig
              </Button>
            )
          ) : (
            <Button
              size="lg"
              className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
            >
              Logg inn for å bestille
            </Button>
          )}
        </div>

        <Button
          size="lg"
          variant="outline"
          className="w-full font-[family-name:var(--font-dm-sans)] font-medium"
        >
          Legg til i ønskeliste
        </Button>
      </div>
    </div>
  );
}

export default memo(ProductInfo);
