'use client';

// Node Modules
import { memo } from 'react';
import Image from 'next/image';
import { Package } from '@repo/ui/lib/icons';

// Components
import { Switch } from '@repo/ui/components/base/switch';

// Types
import { ProductResponse } from '@/hooks/useProduct/types';

// Constants
import { STORE_URL } from '@/constants/url.constants';

interface ProductCardProps {
  product: ProductResponse;
  onToggleActive?: (productId: string, isActive: boolean) => void;
}

function ProductCard(props: ProductCardProps) {
  const { product, onToggleActive } = props;

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
            <span>Lagerstatus:</span>
            <span
              className={`rounded-full px-2 py-1 font-medium ${getStockStatusColor(product.noOfUnits)}`}
            >
              {product.noOfUnits}
            </span>
          </div>
          <div>
            Pris ekskl./inkl. MVA:{' '}
            <span className="font-medium text-[var(--baladi-dark)]">
              {product.costPrice}kr /{' '}
              {product.costPrice + (product.vat * product.costPrice) / 100}kr
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${STORE_URL}/product/${product.slug}`}
            className="text-[var(--baladi-primary)] hover:underline"
          >
            Se produkt i nettbutikken
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);

function getStockStatusColor(stock: number) {
  if (stock > 100) return 'text-green-600 bg-green-50';
  if (stock > 50) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
}
