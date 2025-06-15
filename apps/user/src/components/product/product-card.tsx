'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo, useState } from 'react';
import { Check, Heart, ShoppingCart, BarChart3 } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

// Types/Utils
import { formatPrice } from '@/utils/price.util';
import { ProductResponse } from '@/hooks/useProduct/types';

interface ProductCardProps {
  product: ProductResponse;
  className?: string;
}

function ProductCard(props: ProductCardProps) {
  const { product, className } = props;

  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const [quantity, setQuantity] = useState(1);

  const { isInCartState, cartQuantity, isOutOfStock, stockCount } =
    useMemo(() => {
      return {
        isInCartState: isInCart(product._id),
        cartQuantity: getItemQuantity(product._id),
        isOutOfStock: product.stock <= 0,
        stockCount: product.stock,
      };
    }, [isInCart, getItemQuantity, product._id, product.stock]);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart(product, quantity);
  }, [addToCart, isAuthenticated, isOutOfStock, product, quantity, router]);

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
              scroll={false}
              href={`/product/${product.slug}`}
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

            {isAuthenticated && (
              <Button
                variant="ghost"
                className={cn(
                  'absolute right-3 top-3 z-20 rounded-full p-2 transition-all duration-300',
                  'hover:scale-110 hover:shadow-md active:scale-95',
                  'bg-white/90 text-[var(--baladi-gray)] hover:bg-white hover:text-red-500',
                )}
              >
                <Heart size={16} className="transition-all duration-300" />
              </Button>
            )}

            {product.hasVolumeDiscount && (
              <div className="absolute left-3 top-3 z-20 rounded-full bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-accent)] px-2 py-1 text-xs font-medium text-white shadow-sm">
                <BarChart3 size={12} className="mr-1 inline-block" />
                Volum rabatt
              </div>
            )}
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

        {isAuthenticated && (
          <div className="mb-3 flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                {formatPrice(product.salePrice)} kr
              </span>
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              {product.vat}% Inkl. mva
            </span>
          </div>
        )}

        {!isInCartState && !isOutOfStock && (
          <div className="transition-opacity duration-200">
            <div className="flex items-center justify-between space-x-2">
              <div className="max-w-[100px] flex-grow">
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={Math.min(99, stockCount)}
                  size="sm"
                />
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={cn(
                  'flex items-center justify-center rounded-lg p-2.5 text-white transition-all duration-300',
                  'bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-accent)] shadow-md hover:from-[var(--baladi-secondary-dark)] hover:to-[var(--baladi-accent-dark)] hover:shadow-lg',
                )}
              >
                <ShoppingCart size={16} />
              </Button>
            </div>
          </div>
        )}

        {isInCartState ||
          (isOutOfStock && (
            <div>
              <Button
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
                    <Check className="mr-2 h-4 w-4" />I handlekurven (
                    {cartQuantity})
                  </>
                ) : (
                  'Utsolgt'
                )}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(ProductCard);
