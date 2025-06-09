'use client';

// Node Modules
import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/image';
import { Plus, Filter, Settings, Package } from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import { Switch } from '@repo/ui/components/base/switch';

// Types
import { ProductResponse } from '@/hooks/useProduct/types';
import type { HierarchicalCategory } from '@repo/types/category';

interface ProductCardProps {
  product: ProductResponse;
  onToggleActive?: (productId: string, isActive: boolean) => void;
}

function ProductCard(props: ProductCardProps) {
  const { product, onToggleActive } = props;

  const getStockStatusColor = (stock: number) => {
    if (stock > 100) return 'text-green-600 bg-green-50';
    if (stock > 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-[var(--baladi-border)] bg-gray-50/50 p-4 transition-all hover:shadow-md">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-white">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]!}
            alt={product.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <Package className="h-8 w-8 text-[var(--baladi-gray)]" />
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
            {product.name}
          </h3>
          <Switch
            checked={product.isActive}
            onCheckedChange={(checked) =>
              onToggleActive?.(product._id, checked)
            }
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-[var(--baladi-gray)]">
          <div className="flex items-center gap-1">
            <span>Stock status:</span>
            <span
              className={`rounded-full px-2 py-1 font-medium ${getStockStatusColor(product.noOfUnits)}`}
            >
              {product.noOfUnits}
            </span>
          </div>
          <div>
            Price excl./incl. VAT:{' '}
            <span className="font-medium text-[var(--baladi-dark)]">
              £{product.costPrice} / £{product.salePrice}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href={`/products/${product._id}`}
            className="text-[var(--baladi-primary)] hover:underline"
          >
            View product in the webshop
          </Link>
          <Link
            href={`/products/${product._id}`}
            className="text-[var(--baladi-primary)] hover:underline"
          >
            See customers who bought this product
          </Link>
        </div>
      </div>
    </div>
  );
}

interface ProductListProps {
  selectedCategory: HierarchicalCategory | null;
  products: ProductResponse[];
  onToggleProductActive?: (productId: string, isActive: boolean) => void;
}

function ProductList(props: ProductListProps) {
  const { selectedCategory, products, onToggleProductActive } = props;

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
      <div className="border-b border-[var(--baladi-border)] p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
              {selectedCategory ? selectedCategory.name : 'All Products'}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {products.length} Products
              </Badge>
              {selectedCategory?.isActive && (
                <Badge className="bg-green-100 text-xs text-green-700">
                  Active Category
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Settings className="mr-1 h-3 w-3" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="mr-1 h-3 w-3" />
              Filter
            </Button>
            <Link href="/dashboard/products/new">
              <Button
                size="sm"
                className="hover:bg-[var(--baladi-primary)]/90 h-8 bg-[var(--baladi-primary)]"
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Product
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
              No products found
            </h3>
            <p className="mb-4 text-[var(--baladi-gray)]">
              {selectedCategory
                ? `No products in "${selectedCategory.name}" category.`
                : 'No products match your current filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onToggleActive={onToggleProductActive}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductList);
