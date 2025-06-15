'use client';

// Node Modules
import { useParams, useRouter } from 'next/navigation';
import React, { useState, memo, useMemo, useCallback } from 'react';
import {
  ShoppingCart,
  Package2,
  Truck,
  Check,
  Bell,
  Percent,
  TrendingDown,
  Scale,
  Ruler,
  Barcode,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useDiscount } from '@/hooks/useDiscount';
import { useFavourite } from '@/hooks/useFavourite';
import { useProductBySlug } from '@/hooks/useProduct';

// Utils
import { formatPrice } from '@/utils/price.util';

function ProductInfo() {
  const { slug } = useParams<{ slug: string }>();

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { addToFavoritesMutation } = useFavourite();
  const { bulkDiscountQuery } = useDiscount();
  const { data: productData, isLoading } = useProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);

  const { product, isProductInCart, isOutOfStock, bulkDiscounts, volume } =
    useMemo(() => {
      if (!productData?.product) return { product: null, isInCart: false };

      return {
        product: productData?.product,
        isProductInCart: isInCart(productData?.product?._id),
        isOutOfStock: productData?.product?.stock <= 0,
        bulkDiscounts: bulkDiscountQuery.data?.bulkDiscounts || [],
        volume:
          (productData?.product?.dimensions?.length ?? 0) *
          (productData?.product?.dimensions?.width ?? 0) *
          (productData?.product?.dimensions?.height ?? 0),
      };
    }, [isInCart, productData?.product, bulkDiscountQuery.data]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    addToCart(product, quantity);
  }, [product, quantity, addToCart]);

  const handleAddToWishlist = useCallback(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (product?._id) {
      addToFavoritesMutation.mutate({
        productId: product?._id,
      });
    }
  }, [isAuthenticated, router, product?._id, addToFavoritesMutation]);

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

      {isAuthenticated && (
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
      )}

      {bulkDiscounts &&
        bulkDiscounts.length > 0 &&
        product.hasVolumeDiscount && (
          <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-accent)]/10 rounded-lg bg-gradient-to-r p-4">
            <div className="mb-3 flex items-center gap-3">
              <TrendingDown
                size={20}
                className="text-[var(--baladi-primary)]"
              />
              <h4 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                Mengderabatter tilgjengelig!
              </h4>
            </div>

            <div className="space-y-2">
              {bulkDiscounts
                .sort((a, b) => a.minQuantity - b.minQuantity)
                .slice(0, 3)
                .map((discount) => (
                  <div
                    key={discount._id}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-2">
                      <Percent
                        size={14}
                        className="text-[var(--baladi-primary)]"
                      />
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
                        {discount.minQuantity}+ enheter
                      </span>
                    </div>
                    <span className="rounded-full bg-[var(--baladi-accent)] px-2 py-1 font-[family-name:var(--font-sora)] text-xs font-bold text-white">
                      {discount.discountPercentage}% rabatt
                    </span>
                  </div>
                ))}
            </div>

            <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              Rabattene gjelder automatisk ved kassen
            </p>
          </div>
        )}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Package2 size={18} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
            <strong>Kartong:</strong> {product?.noOfUnits} enheter
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Scale size={18} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
            <strong>Vekt:</strong> {product?.weight} kg
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Ruler size={18} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
            <strong>Volum:</strong> {volume} m³
          </span>
        </div>

        {product?.barcode && (
          <div className="flex items-center gap-3">
            <Barcode size={18} className="text-[var(--baladi-primary)]" />
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
              <strong>Barcode:</strong> {product?.barcode}
            </span>
          </div>
        )}

        {product?.supplier?.countryOfOrigin && (
          <div className="flex items-center gap-3">
            <Truck size={18} className="text-[var(--baladi-primary)]" />
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
              <strong>Opprinnelsesland:</strong>{' '}
              {product?.supplier?.countryOfOrigin}
            </span>
          </div>
        )}
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
              onClick={() => router.push('/login')}
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
          onClick={handleAddToWishlist}
        >
          Legg til i ønskeliste
        </Button>
      </div>
    </div>
  );
}

export default memo(ProductInfo);
