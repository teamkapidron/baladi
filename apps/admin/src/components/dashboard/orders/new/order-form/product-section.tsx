'use client';

// Node Modules
import { useCallback } from 'react';
import { Control, useFormContext } from '@repo/ui/lib/form';

// Icons
import { Package, Plus, Trash2, ShoppingCart } from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import ProductSearchCombobox from '@/components/common/product-search-combobox';

// Types
import type { OrderFormValues } from './schema';

interface ProductSectionProps {
  control: Control<OrderFormValues>;
  watchedItems: OrderFormValues['items'];
}

export function ProductSection({ control, watchedItems }: ProductSectionProps) {
  const form = useFormContext<OrderFormValues>();
  const addItem = useCallback(() => {
    const currentItems = form.getValues('items');
    form.setValue('items', [
      ...currentItems,
      {
        productId: '',
        quantity: 1,
      },
    ]);
  }, [form]);

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

  const updateItemQuantity = useCallback(
    (index: number, productId: string) => {
      const currentItems = form.getValues('items');
      const updatedItems = [...currentItems];
      const currentItem = updatedItems[index];
      if (currentItem) {
        updatedItems[index] = {
          ...currentItem,
          productId,
          quantity: currentItem.quantity || 1,
        };
        form.setValue('items', updatedItems);
      }
    },
    [form],
  );

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
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Legg til produkt</span>
        </Button>
      </div>

      <div className="space-y-4">
        {watchedItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 rounded-lg border border-[var(--baladi-border)] p-4 md:grid-cols-5"
          >
            <div className="md:col-span-3">
              <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                Produkt *
              </FormLabel>
              <ProductSearchCombobox
                onSelect={(productId) => updateItemQuantity(index, productId)}
                placeholder="Søk etter produkt"
                className="mt-1"
              />
            </div>

            <div className="md:col-span-1">
              <FormField
                control={control}
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                      Antall *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-end md:col-span-1">
              <Button
                type="button"
                onClick={() => removeItem(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {watchedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart className="text-[var(--baladi-gray)]/50 mb-3 h-12 w-12" />
            <p className="font-[family-name:var(--font-inter)] text-sm font-medium text-[var(--baladi-text)]">
              Ingen produkter lagt til
            </p>
            <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--baladi-gray)]">
              Klikk "Legg til produkt" for å starte
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
