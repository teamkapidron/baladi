'use client';

// Node Modules
import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';
import { Plus, Package } from '@repo/ui/lib/icons';

// Components
import ProductCard from './product-card';
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useProduct } from '@/hooks/useProduct';
import { useCategory } from '@/hooks/useCategory';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

function ProductList() {
  const { category: selectedCategory } = useProductFilters();

  const { categories } = useCategory();
  const selectedCategoryData = useMemo(() => {
    return categories?.categories.find(
      (category) => category._id === selectedCategory,
    );
  }, [categories?.categories, selectedCategory]);

  const { products: data } = useProduct();
  const products = useMemo(() => {
    return data?.products || [];
  }, [data?.products]);

  const handleToggleProductActive = useCallback(
    (productId: string, isActive: boolean) => {
      console.log('Toggle product active:', productId, isActive);
    },
    [],
  );

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
      <div className="border-b border-[var(--baladi-border)] p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
              {selectedCategoryData?.name ?? 'Alle Produkter'}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {products.length} Produkter
              </Badge>
              {selectedCategoryData?.isActive && (
                <Badge className="bg-green-100 text-xs text-green-700">
                  Aktiv Kategori
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/products/new">
              <Button
                size="sm"
                className="hover:bg-[var(--baladi-primary)]/90 h-8 bg-[var(--baladi-primary)]"
              >
                <Plus className="mr-1 h-3 w-3" />
                Legg til Produkt
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4">
        {products.length === 0 ? (
          <div className="py-8 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-[var(--baladi-gray)]" />
            <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-medium text-[var(--baladi-dark)]">
              Ingen produkter funnet
            </h3>
            <p className="mb-4 text-[var(--baladi-gray)]">
              {selectedCategoryData?.name
                ? `Ingen produkter i "${selectedCategoryData.name}" kategori.`
                : 'Ingen produkter matcher dine nåværende filtre.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onToggleActive={handleToggleProductActive}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductList);
