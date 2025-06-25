'use client';

// Node Modules
import { useCallback, useEffect } from 'react';
import Image from 'next/image';

// Icons
import { Package, Trash2, ShoppingCart, Scan } from '@repo/ui/lib/icons';

// Components
import { Control, useFormContext } from '@repo/ui/lib/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Button } from '@repo/ui/components/base/button';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';
import ProductSearchCombobox from '@/components/common/product-search-combobox';
import { ScannerInfo } from './scanner-info';

// Hooks
import { useScanner } from '@/hooks/useScanner';

// Types
import type { OrderFormValues } from './schema';
import type { QuickSearchProduct } from '@/hooks/useProduct/types';
import { UserType } from '@repo/types/user';
import { formatPrice } from '@/utils/price.util';

interface ProductSectionProps {
  control: Control<OrderFormValues>;
  watchedItems: OrderFormValues['items'];
}

export function ProductSection({ control, watchedItems }: ProductSectionProps) {
  const form = useFormContext<OrderFormValues>();
  const userType = form.watch('userType');

  useEffect(() => {
    const currentItems = form.getValues('items');

    const updatedItems = currentItems.map((item) => {
      const matchedItem = watchedItems.find(
        (i) => i.productId === item.productId,
      );
      const newPrice =
        userType === UserType.INTERNAL
          ? (matchedItem?.costPrice ?? matchedItem?.price)
          : (matchedItem?.salePrice ?? matchedItem?.price);

      return {
        ...item,
        price: newPrice,
      };
    });

    form.setValue('items', updatedItems);
  }, [userType]);

  const removeItem = useCallback(
    (index: number) => {
      const currentItems = form.getValues('items');
      form.setValue(
        'items',
        currentItems.filter((_, i) => i !== index),
      );
    },
    [form],
  );

  const updateQuantity = useCallback(
    (index: number, newQuantity: number) => {
      const currentItems = form.getValues('items');
      const updatedItems = [...currentItems];
      if (updatedItems[index]) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: newQuantity,
        };
        form.setValue('items', updatedItems);
      }
    },
    [form],
  );

  const addProduct = useCallback(
    (product: QuickSearchProduct) => {
      const currentItems = form.getValues('items');
      const existingItemIndex = currentItems.findIndex(
        (item) => item.productId === product._id,
      );

      if (existingItemIndex >= 0) {
        updateQuantity(
          existingItemIndex,
          (currentItems[existingItemIndex]?.quantity ?? 0) + 1,
        );
      } else {
        form.setValue('items', [
          ...currentItems,
          {
            productId: product._id,
            quantity: 1,
            name: product.name,
            barcode: product.barcode,
            costPrice: product.costPrice,
            salePrice: product.salePrice,
            images: product.image ? [product.image] : [],
            price:
              form.watch('userType') === UserType.INTERNAL
                ? product.costPrice
                : product.salePrice,
          },
        ]);
      }
    },
    [form, updateQuantity],
  );

  const { isScanning } = useScanner({
    onProductScanned: addProduct,
    isEnabled: true,
  });

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
            Produkter
          </h2>
        </div>
      </div>

      <div className="mb-6">
        <FormLabel className="mb-2 block font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
          Søk og legg til produkter
        </FormLabel>
        <ProductSearchCombobox
          onSelectProduct={addProduct}
          placeholder="Søk etter produkt for å legge til"
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <ScannerInfo />
      </div>

      <div className="space-y-4">
        {watchedItems.map((item, index) => (
          <div
            key={`${item.productId}-${index}`}
            className="rounded-lg border border-[var(--baladi-border)] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="bg-[var(--baladi-light)]/30 relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                {item.images?.[0] ? (
                  <Image
                    src={item.images[0]}
                    alt={item.name!}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="text-[var(--baladi-gray)]/50 h-8 w-8" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                      {item.name}
                    </h3>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Barkode: {item.barcode}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FormField
                      control={control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                            Antall:
                          </FormLabel>
                          <FormControl>
                            <QuantityInput
                              value={field.value}
                              onChange={(newQuantity) => {
                                field.onChange(newQuantity);
                                updateQuantity(index, newQuantity);
                              }}
                              min={1}
                              max={999}
                              size="sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`items.${index}.productId`}
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <input type="hidden" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="text-right">
                    <div className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
                      {formatPrice(item.price! * item.quantity)} kr
                    </div>
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      {formatPrice(item.price!)} kr per stk
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {watchedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="text-[var(--baladi-gray)]/50 mb-3 h-12 w-12" />
            <p className="font-[family-name:var(--font-inter)] text-lg font-medium text-[var(--baladi-text)]">
              Ingen produkter lagt til
            </p>
            <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--baladi-gray)]">
              Søk etter produkter ovenfor eller skann en strekkode for å legge
              dem til bestillingen
            </p>
            {isScanning && (
              <div className="mt-3 flex items-center gap-2 text-[var(--baladi-primary)]">
                <Scan className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">Skanner produkt...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {watchedItems.length > 0 && (
        <div className="bg-[var(--baladi-light)]/30 mt-6 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-dark)]">
              Totalt antall produkter:
            </span>
            <span className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-primary)]">
              {watchedItems.reduce((sum, item) => sum + item.quantity, 0)} stk
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-dark)]">
              Estimert totalbeløp:
            </span>
            <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
              {formatPrice(
                watchedItems.reduce(
                  (sum, item) => sum + item.price! * item.quantity,
                  0,
                ),
              )}{' '}
              kr
            </span>
          </div>
        </div>
      )}

      {/* Scanner Status Indicator */}
      {isScanning && watchedItems.length > 0 && (
        <div className="bg-[var(--baladi-primary)]/10 mt-4 flex items-center justify-center gap-2 rounded-lg p-3">
          <Scan className="h-4 w-4 animate-pulse text-[var(--baladi-primary)]" />
          <span className="text-sm font-medium text-[var(--baladi-primary)]">
            Klar for ny strekkode...
          </span>
        </div>
      )}
    </div>
  );
}
