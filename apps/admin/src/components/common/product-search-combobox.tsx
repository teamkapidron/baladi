'use client';

// Node Modules
import { cn } from '@repo/ui/lib/utils';
import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Check, Package, Search, X } from '@repo/ui/lib/icons';

// Components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@repo/ui/components/base/command';

// Hooks
import { useQuickSearchProduct } from '@/hooks/useProduct';
import { QuickSearchProduct } from '@/hooks/useProduct/types';

interface ProductSearchComboboxProps {
  onSelect?: (productId: string) => void;
  onSelectProduct?: (product: QuickSearchProduct) => void;
  resetSearchQuery?: boolean;
  placeholder?: string;
  className?: string;
}

function ProductSearchCombobox(props: ProductSearchComboboxProps) {
  const {
    onSelect,
    onSelectProduct,
    placeholder,
    className,
    resetSearchQuery,
  } = props;

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] =
    useState<QuickSearchProduct | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { quickSearchProductQuery, handleSearch } =
    useQuickSearchProduct(searchQuery);
  const products = quickSearchProductQuery.data?.products || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleSelect(productId: string) {
    const product = products.find((p) => p._id === productId);
    if (resetSearchQuery) {
      setSearchQuery('');
    } else {
      setSearchQuery(product?.name || '');
    }
    if (product) {
      setSelectedProduct(product);
      onSelectProduct?.(product);
    }
    onSelect?.(productId);
    setOpen(false);
  }

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      handleSearch(value);
      setOpen(value.length > 0);
    },
    [handleSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchQuery.length > 0) {
      setOpen(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-[var(--baladi-gray)]" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder ?? 'Søk etter produkt...'}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={cn(
            'flex h-10 w-full rounded-md border border-[var(--baladi-border)] bg-white px-3 py-2 pl-10 pr-10 text-sm text-[var(--baladi-text)] placeholder:text-[var(--baladi-gray)] focus:border-[var(--baladi-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--baladi-primary)] disabled:cursor-not-allowed disabled:opacity-50',
            'font-[family-name:var(--font-inter)]',
          )}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            title="Tøm søk"
            aria-label="Tøm søk"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--baladi-gray)] hover:text-[var(--baladi-text)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-white shadow-xl">
          <Command shouldFilter={false}>
            <CommandList className="max-h-[300px] overflow-y-auto">
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
        </div>
      )}
    </div>
  );
}

export default memo(ProductSearchCombobox);
