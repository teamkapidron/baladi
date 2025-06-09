import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, PercentIcon, ShoppingCart } from '@repo/ui/lib/icons';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';
import { memo } from 'react';

interface ProductCardProps {
  className?: string;
}

function ProductCard(props: ProductCardProps) {
  const { className } = props;

  const isAuthenticated = true;

  const product = {
    slug: 'product-slug',
    imageUrl: 'https://via.placeholder.com/400',
    name: 'Product Name',
    price: 100,
    oldPrice: 150,
    stock: 10,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    isFavorite: false,
    isOutOfStock: false,
    categoryName: 'Category Name',
    vat: 25,
    formattedPrice: '100 kr',
  };

  const showAddToCart = true;
  const showBulkOptions = true;
  const quantity = 1;
  const isInCartState = false;
  const isOutOfStock = false;

  const handleAddToCart = () => {
    console.log('Add to cart');
  };

  const setQuantity = (value: number) => {
    console.log('Set quantity', value);
  };

  const isAddingToCart = false;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-white transition-all duration-300',
        'border border-gray-100 hover:border-gray-200',
        'group hover:shadow',
        className,
      )}
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#f5f5f5]">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Link
              href={`/products/${product.slug}`}
              className="block h-full w-full"
            >
              <Image
                width={400}
                height={400}
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                priority={false}
                quality={85}
              />
            </Link>

            <button
              className={cn(
                'absolute right-2 top-2 z-20 rounded-full p-2 transition-all duration-300',
                'hover:scale-110 hover:shadow-md active:scale-95',
                product.isFavorite
                  ? 'bg-white/90 text-red-500 hover:bg-white'
                  : 'bg-white/80 text-gray-400 hover:bg-white hover:text-gray-600',
              )}
            >
              <Heart size={18} className={cn('transition-all duration-300')} />
            </button>
          </div>
        </div>

        <div className="absolute left-2 top-2 z-10">
          <div className="flex items-center rounded-md border border-purple-200 bg-purple-100 px-2 py-1 text-xs font-bold text-purple-700 shadow-sm">
            <PercentIcon size={12} className="mr-1 text-purple-500" />
            5% off
          </div>
        </div>

        {!product.isOutOfStock ? (
          <div
            className={cn(
              'absolute bottom-3 left-3 z-10 rounded px-2 py-0.5 text-xs text-white',
              product.stock <= 5 ? 'bg-amber-500' : 'bg-green-500',
              'opacity-90',
            )}
          >
            {product.stock <= 5 ? `${product.stock} igjen` : 'På lager'}
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 z-10 rounded bg-red-500 px-2 py-0.5 text-xs text-white opacity-90">
            Utsolgt
          </div>
        )}
      </div>

      <div className="relative z-10 bg-white p-3">
        <div className="mb-1">
          <span className="text-xs font-medium text-[var(--baladi-primary)]">
            {product.categoryName}
          </span>
        </div>
        <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] font-medium text-[var(--baladi-dark)]">
          <a href={`/products/${product.slug}`}>{product.name}</a>
        </h3>

        {isAuthenticated ? (
          <div className="flex items-baseline">
            <span className="font-bold text-[var(--baladi-dark)]">
              {product.formattedPrice}
            </span>
            <span className="ml-1 text-[10px] text-gray-500">
              {product.vat}% Inkl. mva
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <a href="/login" className="text-sm text-[var(--baladi-primary)]">
              Logg inn for å se pris
            </a>
          </div>
        )}

        {isAuthenticated &&
          showAddToCart &&
          !isInCartState &&
          !isOutOfStock && (
            <div
              className={cn(
                'mt-3 transition-opacity duration-200',
                'opacity-100',
              )}
            >
              <div className="flex items-center justify-between space-x-2">
                {/* Quantity input */}
                {showBulkOptions && (
                  <div className="max-w-[120px] flex-grow">
                    <QuantityInput
                      value={quantity}
                      onChange={setQuantity}
                      disabled={isInCartState || isAddingToCart}
                      min={1}
                      max={99}
                      size="sm"
                    />
                  </div>
                )}

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isInCartState || isAddingToCart}
                  className={cn(
                    'flex items-center justify-center rounded-md p-2 text-white transition-colors',
                    showBulkOptions ? 'flex-shrink-0' : 'w-full py-2',
                    isAddingToCart
                      ? 'bg-[var(--baladi-primary-light)]'
                      : 'bg-[var(--baladi-secondary)] hover:bg-[var(--baladi-secondary-dark)]',
                  )}
                >
                  {isAddingToCart ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <ShoppingCart size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

        {isAuthenticated &&
          (isInCartState || isOutOfStock) &&
          showAddToCart && (
            <div className="mt-3">
              <button
                className={cn(
                  'flex w-full items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium',
                  isInCartState
                    ? 'border border-green-200 bg-green-100 text-green-700'
                    : 'border border-gray-200 bg-gray-100 text-gray-500',
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
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    I handlekurven
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
