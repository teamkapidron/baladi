'use client';

// Node Modules
import debounce from 'lodash.debounce';
import { cn } from '@repo/ui/lib/utils';
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Check, ChevronsUpDown, Package } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/base/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';

// Hooks
import { useQuickSearchProduct } from '@/hooks/useProduct';
import { QuickSearchProduct } from '@/hooks/useProduct/types';

interface ProductSearchComboboxProps {
  onSelect?: (productId: string) => void;
  placeholder?: string;
  className?: string;
}

function ProductSearchCombobox(props: ProductSearchComboboxProps) {
  const { onSelect, placeholder, className } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] =
    useState<QuickSearchProduct | null>(null);

  const debouncedSearch = useRef(
    debounce((search: string) => {
      setSearch(search);
    }, 300),
  );

  const { quickSearchProductQuery } = useQuickSearchProduct(search);
  const products = quickSearchProductQuery.data?.products || [];

  function handleSelect(productId: string) {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setSelectedProduct(product);
    }
    onSelect?.(productId);
    setOpen(false);
  }

  const handleSearch = useCallback((value: string) => {
    debouncedSearch.current(value);
  }, []);

  useEffect(() => {
    const debouncedSearchRef = debouncedSearch.current;

    return () => {
      debouncedSearchRef.cancel();
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between border-[var(--baladi-border)] bg-white text-[var(--baladi-text)] hover:bg-[var(--baladi-surface)] hover:text-[var(--baladi-text)]',
            className,
          )}
        >
          <span className="truncate font-[family-name:var(--font-inter)]">
            {selectedProduct
              ? selectedProduct.name
              : (placeholder ?? 'Søk etter produkt')}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] border-[var(--baladi-border)] bg-white p-0 shadow-xl">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b border-[var(--baladi-border)] px-4 py-3">
            <CommandInput
              placeholder={placeholder ?? 'Søk etter produkt...'}
              className="border-0 bg-transparent font-[family-name:var(--font-inter)] text-[var(--baladi-text)] placeholder:text-[var(--baladi-gray)] focus:outline-none"
              onValueChange={handleSearch}
            />
          </div>
          <CommandList>
            <CommandEmpty className="flex flex-col items-center justify-center py-8">
              <Package className="text-[var(--baladi-gray)]/50 mb-3 h-12 w-12" />
              <p className="font-[family-name:var(--font-inter)] text-sm font-medium text-[var(--baladi-text)]">
                Ingen produkter funnet
              </p>
              <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--baladi-gray)]">
                Prøv å søke med andre søkeord
              </p>
            </CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product._id}
                  value={product.name}
                  onSelect={() => handleSelect(product._id)}
                  className="cursor-pointer p-0 font-[family-name:var(--font-inter)] text-[var(--baladi-text)]"
                >
                  <div className="hover:from-[var(--baladi-primary)]/5 hover:to-[var(--baladi-secondary)]/5 flex w-full items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-gradient-to-r">
                    <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br">
                      <Package className="h-5 w-5 text-[var(--baladi-primary)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[var(--baladi-text)]">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="bg-[var(--baladi-primary)]/10 rounded-full px-2 py-0.5 text-xs font-medium text-[var(--baladi-primary)]">
                          {product.categories.name}
                        </span>
                      </div>
                    </div>

                    <Check
                      className={cn(
                        'h-4 w-4 transition-opacity',
                        selectedProduct?._id === product._id
                          ? 'text-[var(--baladi-primary)] opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default memo(ProductSearchCombobox);
