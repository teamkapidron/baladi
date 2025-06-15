'use client';

// Node Modules
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState, memo, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, ZoomIn } from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useFavourite } from '@/hooks/useFavourite';
import { useProductBySlug } from '@/hooks/useProduct';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

function ProductGallery() {
  const { slug } = useParams<{ slug: string }>();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { addToFavoritesMutation, removeFromFavoritesMutation } =
    useFavourite();
  const { data: productData, isLoading } = useProductBySlug(slug);

  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { product, images, categories, isFavorite } = useMemo(() => {
    return {
      product: productData?.product,
      images: productData?.product?.images || [],
      categories: productData?.product?.categories || [],
      isFavorite: productData?.product?.isFavorite || false,
    };
  }, [productData]);

  const currentImage = images[selectedImageIndex] || '';

  const handlePreviousImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  }, [images]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  }, [images]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const toggleFavorite = useCallback(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (product?._id) {
      if (isFavorite) {
        removeFromFavoritesMutation.mutate(
          {
            productId: product._id,
          },
          {
            onSuccess: function () {
              queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
              });
            },
          },
        );
      } else {
        addToFavoritesMutation.mutate(
          {
            productId: product._id,
          },
          {
            onSuccess: function () {
              queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
              });
            },
          },
        );
      }
    }
  }, [
    isAuthenticated,
    product?._id,
    router,
    isFavorite,
    removeFromFavoritesMutation,
    queryClient,
    slug,
    addToFavoritesMutation,
  ]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed);
  }, [isZoomed]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="aspect-square w-full animate-pulse rounded-lg bg-[var(--baladi-light)]" />
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square w-20 animate-pulse rounded-md bg-[var(--baladi-light)]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-[var(--baladi-light)]/30 group relative aspect-square overflow-hidden rounded-lg shadow-lg">
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          {categories.map((category) => (
            <Badge
              key={category._id}
              className="bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)] font-[family-name:var(--font-dm-sans)] text-white"
            >
              {category.name}
            </Badge>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={toggleFavorite}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white"
        >
          <Heart
            size={20}
            className={cn(
              'transition-colors',
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-[var(--baladi-gray)]',
            )}
          />
        </Button>

        <div className="relative h-full w-full">
          <Image
            fill
            priority
            src={currentImage}
            alt={product?.name || 'Product image'}
            className={cn(
              'object-cover transition-transform duration-500',
              isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105',
            )}
          />

          <Button
            variant="ghost"
            onClick={toggleZoom}
            className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white group-hover:opacity-100"
          >
            <ZoomIn size={20} className="text-[var(--baladi-dark)]" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white group-hover:opacity-100"
              >
                <ChevronLeft size={20} className="text-[var(--baladi-dark)]" />
              </Button>
              <Button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white group-hover:opacity-100"
              >
                <ChevronRight size={20} className="text-[var(--baladi-dark)]" />
              </Button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <Button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                'relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200',
                selectedImageIndex === index
                  ? 'ring-[var(--baladi-primary)]/20 border-[var(--baladi-primary)] ring-2'
                  : 'border-[var(--baladi-border)] hover:border-[var(--baladi-primary)]',
              )}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {selectedImageIndex !== index && (
                <div className="absolute inset-0 bg-black/20" />
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(ProductGallery);
