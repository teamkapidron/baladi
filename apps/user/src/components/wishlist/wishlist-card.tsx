'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ExternalLink, Trash2 } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useFavourite } from '@/hooks/useFavourite';

// Types
import { formatPrice } from '@/utils/price.util';
import { FavoriteResponse } from '@/hooks/useFavourite/types';

interface WishlistCardProps {
  favorite: FavoriteResponse;
}

function WishlistCard(props: WishlistCardProps) {
  const { favorite } = props;

  const [imageError, setImageError] = useState(false);
  const { removeFromFavoritesMutation } = useFavourite();

  const { product } = favorite;
  const hasDiscount = product.price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.price) / product.price) * 100)
    : 0;

  const handleRemoveFromWishlist = useCallback(() => {
    removeFromFavoritesMutation.mutate({ productId: product._id });
  }, [product._id, removeFromFavoritesMutation]);

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imageError && product.images.length > 0 ? (
          <Image
            src={product.images[0] || ''}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {hasDiscount && (
          <Badge className="absolute top-3 left-3 bg-red-500 font-semibold text-white">
            -{discountPercent}%
          </Badge>
        )}

        <Button
          size="sm"
          variant="outline"
          className="group/btn absolute top-3 right-3 h-9 w-9 border-gray-200 bg-white/90 p-0 backdrop-blur-sm hover:border-red-200 hover:bg-red-50"
          onClick={handleRemoveFromWishlist}
          disabled={removeFromFavoritesMutation.isPending}
        >
          <Trash2 className="h-4 w-4 text-gray-600 transition-colors group-hover/btn:text-red-500" />
        </Button>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 font-[family-name:var(--font-sora)] text-lg leading-tight font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="line-clamp-2 font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
          {product.shortDescription}
        </p>

        {product.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.categories.slice(0, 2).map((category) => (
              <Badge
                key={category._id}
                variant="secondary"
                className="font-[family-name:var(--font-dm-sans)] text-xs"
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

        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <div className="space-y-1">
            {hasDiscount && (
              <p className="font-[family-name:var(--font-dm-sans)] text-xs text-gray-500 line-through">
                {formatPrice(product.price)} kr
              </p>
            )}
            <p className="text-baladi-primary font-[family-name:var(--font-sora)] text-lg font-bold">
              {formatPrice(product.price)} kr
            </p>
          </div>

          <Link href={`/product/${product.slug}`}>
            <Button
              size="sm"
              className="from-baladi-primary to-baladi-secondary hover:from-baladi-primary/90 hover:to-baladi-secondary/90 group/link bg-gradient-to-r font-[family-name:var(--font-dm-sans)] text-white shadow-md transition-all duration-300 hover:shadow-lg"
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
