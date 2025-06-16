'use client';
// Node Modules
import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Icons
import { ShoppingCart, ExternalLink, Trash2 } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useFavourite } from '@/hooks/useFavourite';

// Types
import { Favorite } from '@/hooks/useFavourite/types';

// Props
interface WishlistCardProps {
  favorite: Favorite;
}

function WishlistCard(props: WishlistCardProps) {
  const { favorite } = props;
  const [imageError, setImageError] = useState(false);
  const { removeFromFavoritesMutation } = useFavourite();
  const { product } = favorite;

  const hasDiscount = product.salePrice < product.unitPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.unitPrice - product.salePrice) / product.unitPrice) * 100,
      )
    : 0;

  const handleRemoveFromWishlist = useCallback(() => {
    removeFromFavoritesMutation.mutate({ productId: product._id });
  }, [product._id, removeFromFavoritesMutation]);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-64 w-full overflow-hidden">
        {!imageError && product.images.length > 0 ? (
          <Image
            src={product.images[0] || ''}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {hasDiscount && (
          <Badge className="absolute left-3 top-3 bg-red-500 font-semibold text-white">
            -{discountPercent}%
          </Badge>
        )}

        <Button
          size="sm"
          variant="outline"
          className="group/btn absolute right-3 top-3 h-9 w-9 border-gray-200 bg-white/90 p-0 backdrop-blur-sm hover:border-red-200 hover:bg-red-50"
          onClick={handleRemoveFromWishlist}
          disabled={removeFromFavoritesMutation.isPending}
        >
          <Trash2 className="h-4 w-4 text-gray-600 transition-colors group-hover/btn:text-red-500" />
        </Button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600">
            {product.shortDescription}
          </p>

          {product.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="text-xs"
                >
                  {category.name}
                </Badge>
              ))}
              {product.categories.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.categories.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-300 pt-3">
          <div>
            {hasDiscount && (
              <p className="text-xs text-gray-500 line-through">
                {product.unitPrice.toLocaleString('nb-NO')} kr
              </p>
            )}
            <p className="text-baladi-primary text-lg font-bold">
              {product.salePrice.toLocaleString('nb-NO')} kr
            </p>
          </div>

          <Link href={`/product/${product.slug}`} target="_blank">
            <Button
              size="sm"
              className="group/link bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] text-white hover:shadow-lg"
            >
              <ExternalLink className="mr-1.5 h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
              Se produkt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(WishlistCard);
