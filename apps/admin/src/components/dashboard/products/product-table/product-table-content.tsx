'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import { memo, useMemo } from 'react';
import {
  Eye,
  EditIcon,
  Package,
  DollarSign,
  Barcode,
  Tag,
} from '@repo/ui/lib/icons';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

// Hooks
import { useProduct } from '@/hooks/useProduct';

// Types
import { Visibility } from '@repo/types/product';

function ProductTableContent() {
  const { products: productsData } = useProduct();

  const products = useMemo(() => {
    return productsData?.products || [];
  }, [productsData]);

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        label: 'Utsolgt',
        color: 'text-[var(--baladi-error)] bg-red-50',
        badge: 'bg-red-100 text-red-800',
      };
    if (stock < 10)
      return {
        label: `Lav Lagerbeholdning (${stock})`,
        color: 'text-[var(--baladi-warning)] bg-amber-50',
        badge: 'bg-amber-100 text-amber-800',
      };
    return {
      label: stock.toString(),
      color: 'text-[var(--baladi-success)] bg-green-50',
      badge: 'bg-green-100 text-green-800',
    };
  };

  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'private':
        return 'bg-gray-100 text-gray-800';
      case 'hidden':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <div className="max-h-[700px] overflow-auto rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-[var(--baladi-border)] bg-[var(--baladi-light)]">
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Produktdetaljer
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Priser & SKU
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Lager
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Kategorier
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Status
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-center font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <TableRow
                  key={product._id}
                  className={`border-b border-[var(--baladi-border)] transition-colors hover:bg-[var(--baladi-muted)] ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[var(--baladi-light)]'
                  }`}
                >
                  {/* Product Details */}
                  <TableCell className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            alt={product.name}
                            src={product.images[0]!}
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-6 w-6 text-[var(--baladi-gray)]" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-primary)]">
                          {product.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--baladi-gray)]">
                          {product.shortDescription ||
                            product.description ||
                            'Ingen beskrivelse tilgjengelig'}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            ID: {product._id}
                          </span>
                          {product.sku && (
                            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                              <Barcode className="mr-1 h-3 w-3" />
                              {product.sku}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Pricing & SKU */}
                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-[var(--baladi-success)]" />
                        <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                          {product.salePrice?.toFixed(2) || '0.00'} kr
                        </span>
                      </div>
                      <div className="text-sm text-[var(--baladi-gray)]">
                        Kostnad: {product.costPrice?.toFixed(2) || '0.00'} kr
                      </div>
                      {product.vat > 0 && (
                        <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                          +{product.vat}% VAT
                        </span>
                      )}
                      {product.barcode && (
                        <div className="text-xs text-[var(--baladi-gray)]">
                          Barcode: {product.barcode}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Inventory */}
                  <TableCell className="p-4">
                    <div className="space-y-3">
                      <div
                        className={`inline-flex items-center rounded-lg px-3 py-2 ${stockStatus.color}`}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        <span className="font-medium">{stockStatus.label}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-[var(--baladi-gray)]">
                          Enheter: {product.noOfUnits || 1}
                        </div>
                        {product.weight && (
                          <div className="text-xs text-[var(--baladi-gray)]">
                            Vekt: {product.weight}kg
                          </div>
                        )}
                        {product.dimensions && (
                          <div className="text-xs text-[var(--baladi-gray)]">
                            Dimensjoner: {product.dimensions.length}×
                            {product.dimensions.width}×
                            {product.dimensions.height}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Categories */}
                  <TableCell className="p-4">
                    <div className="space-y-2">
                      {product.categories && product.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {product.categories
                            .slice(0, 3)
                            .map((category, idx) => (
                              <span
                                key={idx}
                                className="bg-[var(--baladi-primary)]/10 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium text-[var(--baladi-primary)]"
                              >
                                <Tag className="mr-1 h-3 w-3" />
                                {category.name}
                              </span>
                            ))}
                          {product.categories.length > 3 && (
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                              +{product.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-[var(--baladi-gray)]">
                          Ingen kategorier
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.isActive ? 'Aktiv' : 'Inaktiv'}
                      </span>
                      <br />
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getVisibilityBadge(product.visibility)}`}
                      >
                        {product.visibility === Visibility.BOTH
                          ? 'Begge'
                          : product.visibility === Visibility.INTERNAL
                            ? 'Kun Intern'
                            : product.visibility === Visibility.EXTERNAL
                              ? 'Kun Ekstern'
                              : 'Ukjent'}
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        href={`/dashboard/products/${product.slug}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                        title="Se Produkt"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/dashboard/products/edit/${product.slug}`}
                        className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--baladi-primary)] transition-colors"
                        title="Rediger Produkt"
                      >
                        <EditIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(ProductTableContent);
