'use client';

// Node Modules
import { useParams, useRouter } from 'next/navigation';
import React, { useState, memo, useMemo, useCallback, useEffect } from 'react';
import {
  ShoppingCart,
  Package2,
  Truck,
  Bell,
  Percent,
  TrendingDown,
  Scale,
  Ruler,
  Barcode,
  Calendar,
  Heart,
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

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';
import { BulkDiscount } from '@repo/types/bulkDiscount';
import { ProductResponse } from '@/hooks/useProduct/types';

// Sub-components
interface ProductPriceDisplayProps {
  price: number;
  vat: number;
  isAuthenticated: boolean;
  noOfUnits: number;
}

const ProductPriceDisplay = memo(
  ({ price, vat, isAuthenticated, noOfUnits }: ProductPriceDisplayProps) => {
    if (!isAuthenticated) return null;

    const perUnitPrice = price / noOfUnits;

    return (
      <div className="bg-[var(--baladi-light)]/50 space-y-4 rounded-lg p-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-primary)]">
              {formatPrice(price)} kr
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              {formatPrice(perUnitPrice)} kr per enhet
            </span>
          </div>
        </div>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Pris inkluderer {vat}% MVA
        </p>
      </div>
    );
  },
);

interface ProductSpecificationRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const ProductSpecificationRow = memo(
  ({ icon, label, value }: ProductSpecificationRowProps) => (
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
        <strong>{label}:</strong> {value}
      </span>
    </div>
  ),
);

interface ProductSpecificationsProps {
  product: ProductResponse;
  volume: number;
  isAuthenticated: boolean;
}

const ProductSpecifications = memo(
  ({ product, volume, isAuthenticated }: ProductSpecificationsProps) => (
    <div className="space-y-3">
      <ProductSpecificationRow
        icon={<Package2 size={18} className="text-[var(--baladi-primary)]" />}
        label="Kartong"
        value={`${product.noOfUnits} enheter`}
      />

      <ProductSpecificationRow
        icon={<Scale size={18} className="text-[var(--baladi-primary)]" />}
        label="Vekt"
        value={`${product.weight} kg`}
      />

      <ProductSpecificationRow
        icon={<Ruler size={18} className="text-[var(--baladi-primary)]" />}
        label="Volum"
        value={`${volume} m³`}
      />

      {product.barcode && (
        <ProductSpecificationRow
          icon={<Barcode size={18} className="text-[var(--baladi-primary)]" />}
          label="Barcode"
          value={product.barcode}
        />
      )}

      {product.supplier?.countryOfOrigin && (
        <ProductSpecificationRow
          icon={<Truck size={18} className="text-[var(--baladi-primary)]" />}
          label="Opprinnelsesland"
          value={product.supplier.countryOfOrigin}
        />
      )}

      {isAuthenticated && product.bestBeforeDate && (
        <ProductSpecificationRow
          icon={<Calendar size={18} className="text-[var(--baladi-primary)]" />}
          label="Utløpsdato"
          value={formatDate(product.bestBeforeDate)}
        />
      )}
    </div>
  ),
);

interface BulkDiscountDisplayProps {
  bulkDiscounts: BulkDiscount[] | undefined;
  hasVolumeDiscount: boolean;
}

const BulkDiscountDisplay = memo(
  ({ bulkDiscounts, hasVolumeDiscount }: BulkDiscountDisplayProps) => {
    if (!bulkDiscounts?.length || !hasVolumeDiscount) return null;

    return (
      <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-accent)]/10 rounded-lg bg-gradient-to-r p-4">
        <div className="mb-3 flex items-center gap-3">
          <TrendingDown size={20} className="text-[var(--baladi-primary)]" />
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
                  <Percent size={14} className="text-[var(--baladi-primary)]" />
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
    );
  },
);

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxStock: number;
  isOutOfStock: boolean;
  availableStock: number;
}

const QuantitySelector = memo(
  ({
    quantity,
    onQuantityChange,
    maxStock,
    isOutOfStock,
    availableStock,
  }: QuantitySelectorProps) => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <QuantityInput
          value={quantity}
          onChange={onQuantityChange}
          min={1}
          max={Math.min(99, maxStock)}
          disabled={isOutOfStock}
          size="lg"
        />
      </div>
      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
        {availableStock} enheter tilgjengelige
      </span>
    </div>
  ),
);

interface ProductActionsProps {
  isAuthenticated: boolean;
  isOutOfStock: boolean;
  cartQuantity: number;
  quantity: number;
  price: number;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  onGoToCart: () => void;
  onGoToLogin: () => void;
}

const ProductActions = memo(
  ({
    isAuthenticated,
    isOutOfStock,
    cartQuantity,
    quantity,
    price,
    onAddToCart,
    onAddToWishlist,
    onGoToCart,
    onGoToLogin,
  }: ProductActionsProps) => (
    <div className="flex gap-3">
      {isAuthenticated ? (
        !isOutOfStock ? (
          cartQuantity && cartQuantity > 0 ? (
            <Button
              size="lg"
              onClick={onGoToCart}
              className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} />
                Gå til Handlekurv • {formatPrice(price * cartQuantity)} kr
              </div>
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={onAddToCart}
              className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} />
                Legg til i Handlekurv • {formatPrice(price * quantity)} kr
              </div>
            </Button>
          )
        ) : (
          <Button
            size="lg"
            variant="outline"
            className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
            disabled
          >
            <Bell size={18} />
            Produktet er ikke tilgjengelig
          </Button>
        )
      ) : (
        <Button
          size="lg"
          onClick={onGoToLogin}
          className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
        >
          Logg inn for å bestille
        </Button>
      )}

      <Button
        size="lg"
        variant="outline"
        className="font-[family-name:var(--font-dm-sans)] font-medium"
        onClick={onAddToWishlist}
      >
        <Heart size={18} />
      </Button>
    </div>
  ),
);

function useProductInfo(slug: string) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart, getItemQuantity } = useCart();
  const { addToFavoritesMutation } = useFavourite();
  const { bulkDiscountQuery } = useDiscount();
  const { data: productData, isLoading } = useProductBySlug(slug);

  const productDetails = useMemo(() => {
    if (!productData?.product) return null;

    const product = productData.product;
    const volume =
      (product.dimensions?.length ?? 0) *
      (product.dimensions?.width ?? 0) *
      (product.dimensions?.height ?? 0);
    const price = product.salePrice + (product.vat * product.salePrice) / 100;
    const cartQuantity = getItemQuantity(product._id);

    return {
      product,
      isOutOfStock: product.stock <= 0,
      bulkDiscounts: bulkDiscountQuery.data?.bulkDiscounts || [],
      volume,
      price,
      cartQuantity,
    };
  }, [
    productData?.product,
    bulkDiscountQuery.data?.bulkDiscounts,
    getItemQuantity,
  ]);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productDetails?.cartQuantity) {
      setQuantity(productDetails.cartQuantity);
    }
  }, [productDetails?.cartQuantity]);

  const handleAddToCart = useCallback(() => {
    if (!productDetails?.product || !isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart(productDetails.product, quantity);
    router.push('/cart');
  }, [productDetails?.product, isAuthenticated, addToCart, quantity, router]);

  const handleAddToWishlist = useCallback(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (productDetails?.product?._id) {
      addToFavoritesMutation.mutate({
        productId: productDetails.product._id,
      });
    }
  }, [
    isAuthenticated,
    router,
    productDetails?.product?._id,
    addToFavoritesMutation,
  ]);

  const handleGoToCart = useCallback(() => {
    router.push('/cart');
  }, [router]);

  const handleGoToLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return {
    ...productDetails,
    isLoading,
    quantity,
    setQuantity,
    isAuthenticated,
    handleAddToCart,
    handleAddToWishlist,
    handleGoToCart,
    handleGoToLogin,
  };
}

const ProductInfoSkeleton = memo(() => (
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
));

function ProductInfo() {
  const { slug } = useParams<{ slug: string }>();
  const {
    product,
    isOutOfStock,
    bulkDiscounts,
    volume,
    price,
    cartQuantity,
    isLoading,
    quantity,
    setQuantity,
    isAuthenticated,
    handleAddToCart,
    handleAddToWishlist,
    handleGoToCart,
    handleGoToLogin,
  } = useProductInfo(slug);

  if (isLoading) {
    return <ProductInfoSkeleton />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)] lg:text-3xl">
          {product.name}
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
          {product.shortDescription}
        </p>
      </div>

      <ProductPriceDisplay
        price={price ?? 0}
        vat={product.vat}
        isAuthenticated={isAuthenticated}
        noOfUnits={product.noOfUnits}
      />

      <ProductSpecifications
        product={product}
        volume={volume ?? 0}
        isAuthenticated={isAuthenticated}
      />

      <BulkDiscountDisplay
        bulkDiscounts={bulkDiscounts}
        hasVolumeDiscount={product.hasVolumeDiscount}
      />

      <Separator />

      <div className="space-y-4">
        {!cartQuantity && (
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            maxStock={product.stock ?? 0}
            isOutOfStock={isOutOfStock ?? false}
            availableStock={product.stock ?? 0}
          />
        )}

        <ProductActions
          isAuthenticated={isAuthenticated}
          isOutOfStock={isOutOfStock ?? false}
          cartQuantity={cartQuantity ?? 0}
          quantity={quantity}
          price={price ?? 0}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onGoToCart={handleGoToCart}
          onGoToLogin={handleGoToLogin}
        />
      </div>
    </div>
  );
}

export default memo(ProductInfo);
