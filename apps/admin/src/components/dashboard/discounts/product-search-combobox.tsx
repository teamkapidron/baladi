'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from '@repo/ui/lib/icons';

import { cn } from '@repo/ui/lib/utils';
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

import { useDebounce } from '@/hooks/useDebounce';
import { useQuickSearchProduct } from '@/hooks/useProduct';

interface Product {
  _id: string;
  name: string;
}

interface ProductSearchComboboxProps {
  value?: Product | null;
  onSelect?: (product: Product | null) => void;
  placeholder?: string;
  className?: string;
}

export default function ProductSearchCombobox({
  value,
  onSelect,
  placeholder = 'Søk etter produkt...',
  className,
}: ProductSearchComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { quickSearchProductQuery } = useQuickSearchProduct(debouncedSearch);
  const products = quickSearchProductQuery.data?.products || [];

  const handleSelect = (product: Product) => {
    onSelect?.(product);
    setOpen(false);
  };

  const handleClear = () => {
    onSelect?.(null);
    setSearch('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            {value ? value.name : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border-[var(--baladi-border)] bg-white p-0 shadow-lg">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            className="h-9 border-0 font-[family-name:var(--font-inter)] text-[var(--baladi-text)] placeholder:text-[var(--baladi-gray)]"
            onValueChange={setSearch}
            value={search}
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center font-[family-name:var(--font-inter)] text-sm text-[var(--baladi-gray)]">
              Ingen produkt funnet.
            </CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product._id}
                  value={product.name}
                  onSelect={() => handleSelect(product)}
                  className="cursor-pointer font-[family-name:var(--font-inter)] text-[var(--baladi-text)] hover:bg-[var(--baladi-surface)]"
                >
                  <span className="truncate">{product.name}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value?._id === product._id
                        ? 'text-[var(--baladi-primary)] opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
