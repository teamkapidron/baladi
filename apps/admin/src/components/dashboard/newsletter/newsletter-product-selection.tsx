'use client';

// Node Modules
import React, { memo, useCallback, useMemo } from 'react';
import { Package, CheckCircle, Tag, ShoppingBag } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useProduct } from '@/hooks/useProduct';

interface NewsletterProductSelectionProps {
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

function NewsletterProductSelection(props: NewsletterProductSelectionProps) {
  const { selectedProducts, setSelectedProducts } = props;

  const { products: productsData } = useProduct();

  const products = useMemo(() => {
    return productsData?.products ?? [];
  }, [productsData]);

  const selectedCount = selectedProducts.length;

  const toggleProductSelection = useCallback(
    (productId: string) => {
      setSelectedProducts((prev) =>
        prev.includes(productId)
          ? prev.filter((id: string) => id !== productId)
          : [...prev, productId],
      );
    },
    [setSelectedProducts],
  );

  return (
    <Card className="rounded-xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Velg Produkter for Nyhetsbrev
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Velg produkter som skal fremheves i din neste nyhetsbrevkampanje
            </p>
          </div>
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <ShoppingBag className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {selectedCount > 0 && (
          <Card className="border-[var(--baladi-success)]/20 bg-[var(--baladi-success)]/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[var(--baladi-success)]" />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-success)]">
                  {selectedCount} produkt{selectedCount > 1 ? 'er' : ''} valgt
                  for nyhetsbrev
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {products.map((product) => {
            const isSelected = selectedProducts.includes(product._id);
            return (
              <Card
                key={product._id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? 'bg-[var(--baladi-primary)]/5 border-[var(--baladi-primary)]'
                    : 'hover:border-[var(--baladi-primary)]/30'
                }`}
                onClick={() => toggleProductSelection(product._id)}
              >
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Checkbox
                        id={`product-${product._id}`}
                        checked={isSelected}
                        onCheckedChange={() =>
                          toggleProductSelection(product._id)
                        }
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="bg-[var(--baladi-secondary)]/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Package className="h-6 w-6 text-[var(--baladi-secondary)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor={`product-${product._id}`}
                            className="line-clamp-2 cursor-pointer font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]"
                          >
                            {product.name}
                          </label>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              <Tag className="mr-1 h-3 w-3" />
                              {product.categories?.[0]?.name ?? 'Ukategorisert'}
                            </Badge>
                          </div>
                        </div>

                        {isSelected && (
                          <Badge className="ml-2 bg-[var(--baladi-primary)] text-white">
                            Valgt
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {products.length === 0 && (
            <Card>
              <CardContent className="p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-[var(--baladi-gray)]/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Package className="h-8 w-8 text-[var(--baladi-gray)]" />
                  </div>
                  <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                    Ingen produkter tilgjengelig
                  </h4>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    Legg til noen produkter i lageret ditt for å fremheve dem i
                    nyhetsbrev
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {selectedCount > 0 && (
          <Card className="bg-[var(--baladi-light)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    Klar til å fremheve i nyhetsbrev
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                    {selectedCount} produkt{selectedCount > 1 ? 'er' : ''} vil
                    bli inkludert
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProducts([])}
                  className="hover:text-[var(--baladi-primary)]/80 text-[var(--baladi-primary)]"
                >
                  Fjern Valg
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(NewsletterProductSelection);
