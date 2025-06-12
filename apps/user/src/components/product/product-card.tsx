'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import { memo, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Heart, ShoppingCart } from '@repo/ui/lib/icons';

// Components
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

// Types/Utils
import { formatPrice } from '@/utils/price.util';
import { ProductResponse } from '@/hooks/useProduct/types';

interface ProductCardProps {
  product: ProductResponse;
  className?: string;
}

function ProductCard(props: ProductCardProps) {
  const { product, className } = props;
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInCartState = isInCart(product._id);
  const cartQuantity = getItemQuantity(product._id);
  const isOutOfStock = product.stock <= 0;
  const stockCount = product.stock;

  const handleAddToCart = async () => {
    if (!isAuthenticated || isOutOfStock) return;

    setIsAddingToCart(true);
    try {
      addToCart(product, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const productImage = product.images?.[0] || '';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white transition-all duration-300',
        'hover:border-[var(--baladi-primary)]/30 border border-[var(--baladi-border)]',
        'hover:shadow-[var(--baladi-primary)]/10 hover:shadow-lg',
        className,
      )}
    >
      <div className="bg-[var(--baladi-light)]/30 relative flex aspect-square items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Link
              href={`/product/${product.slug}?category=${product.categories[0]?._id || ''}`}
              className="block h-full w-full"
            >
              <Image
                width={400}
                height={400}
                src={productImage}
                alt={product.name}
                className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                priority={false}
                quality={85}
              />
            </Link>

            <button
              className={cn(
                'absolute right-3 top-3 z-20 rounded-full p-2 transition-all duration-300',
                'hover:scale-110 hover:shadow-md active:scale-95',
                'bg-white/90 text-[var(--baladi-gray)] hover:bg-white hover:text-red-500',
              )}
            >
              <Heart size={16} className="transition-all duration-300" />
            </button>
          </div>
        </div>

        {!isOutOfStock ? (
          <div
            className={cn(
              'absolute bottom-3 left-3 z-10 rounded-lg px-2 py-1 text-xs font-medium text-white shadow-sm',
              stockCount <= 5 ? 'bg-amber-500' : 'bg-green-500',
            )}
          >
            {stockCount <= 5 ? `${stockCount} igjen` : 'På lager'}
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
            Utsolgt
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="relative z-10 bg-white p-4">
        <div className="mb-2">
          <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
            {product.categories[0]?.name || 'Ukategoriserad'}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
          <Link
            href={`/product/${product.slug}`}
            className="transition-colors hover:text-[var(--baladi-primary)]"
          >
            {product.name}
          </Link>
        </h3>

        {isAuthenticated ? (
          <div className="mb-3 flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                {formatPrice(product.salePrice)} kr
              </span>
              <span className="ml-2 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)] line-through">
                {formatPrice(product.salePrice)} kr
              </span>
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              {product.vat}% Inkl. mva
            </span>
          </div>
        ) : (
          <div className="mb-3 flex items-center">
            <Link
              href="/login"
              className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors hover:text-[var(--baladi-primary-dark)]"
            >
              Logg inn for å se pris
            </Link>
          </div>
        )}

        {isAuthenticated && !isInCartState && !isOutOfStock && (
          <div className="transition-opacity duration-200">
            <div className="flex items-center justify-between space-x-2">
              <div className="max-w-[100px] flex-grow">
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  disabled={isAddingToCart}
                  min={1}
                  max={Math.min(99, stockCount)}
                  size="sm"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                className={cn(
                  'flex items-center justify-center rounded-lg p-2.5 text-white transition-all duration-300',
                  isAddingToCart
                    ? 'bg-[var(--baladi-primary)]/60'
                    : 'bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-accent)] shadow-md hover:from-[var(--baladi-secondary-dark)] hover:to-[var(--baladi-accent-dark)] hover:shadow-lg',
                )}
              >
                {isAddingToCart ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <ShoppingCart size={16} />
                )}
              </button>
            </div>
          </div>
        )}

        {isAuthenticated && (isInCartState || isOutOfStock) && (
          <div>
            <button
              className={cn(
                'flex w-full items-center justify-center rounded-lg px-3 py-2.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-colors',
                isInCartState
                  ? 'border border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                  : 'border border-[var(--baladi-border)] bg-[var(--baladi-muted)] text-[var(--baladi-gray)]',
              )}
              disabled={true}
            >
              {isInCartState ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  I handlekurven ({cartQuantity})
                </>
              ) : (
                'Utsolgt'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductCard);
