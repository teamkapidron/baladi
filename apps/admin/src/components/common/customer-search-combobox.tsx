'use client';

// Node Modules
import debounce from 'lodash.debounce';
import { cn } from '@repo/ui/lib/utils';
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Check, ChevronsUpDown, User } from '@repo/ui/lib/icons';

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
import { useSearchUsers } from '@/hooks/useOrder/useCreateOrder';
import { User as UserType } from '@repo/types/user';

interface CustomerSearchComboboxProps {
  onSelect?: (userId: string, userType?: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

function CustomerSearchCombobox(props: CustomerSearchComboboxProps) {
  const { onSelect, placeholder, className, value } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<UserType | null>(
    null,
  );

  const debouncedSearch = useRef(
    debounce((search: string) => {
      setSearch(search);
    }, 300),
  );
  const { searchUsersQuery } = useSearchUsers(search);
  const users = searchUsersQuery.data?.users;

  function handleSelect(userId: string) {
    const customer = searchUsersQuery.data?.users.find((c) => c._id === userId);
    if (customer) {
      setSelectedCustomer(customer);
      onSelect?.(userId, customer.userType);
    } else {
      onSelect?.(userId);
    }
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
            {selectedCustomer
              ? `${selectedCustomer.name} (${selectedCustomer.email})`
              : (placeholder ?? 'Søk etter kunde')}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] border-[var(--baladi-border)] bg-white p-0 shadow-xl">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b border-[var(--baladi-border)] px-4 py-3">
            <CommandInput
              placeholder={placeholder ?? 'Søk etter kunde...'}
              className="border-0 bg-transparent font-[family-name:var(--font-inter)] text-[var(--baladi-text)] placeholder:text-[var(--baladi-gray)] focus:outline-none"
              onValueChange={handleSearch}
            />
          </div>
          <CommandList>
            <CommandEmpty className="flex flex-col items-center justify-center py-8">
              <User className="text-[var(--baladi-gray)]/50 mb-3 h-12 w-12" />
              <p className="font-[family-name:var(--font-inter)] text-sm font-medium text-[var(--baladi-text)]">
                Ingen kunder funnet
              </p>
              <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--baladi-gray)]">
                Prøv å søke med andre søkeord
              </p>
            </CommandEmpty>
            <CommandGroup>
              {users?.slice(0, 10).map((customer) => (
                <CommandItem
                  key={customer._id}
                  value={customer.name}
                  onSelect={() => handleSelect(customer._id)}
                  className="cursor-pointer p-0 font-[family-name:var(--font-inter)] text-[var(--baladi-text)]"
                >
                  <div className="hover:from-[var(--baladi-primary)]/5 hover:to-[var(--baladi-secondary)]/5 flex w-full items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-gradient-to-r">
                    <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br">
                      <User className="h-5 w-5 text-[var(--baladi-primary)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[var(--baladi-text)]">
                        {customer.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--baladi-gray)]">
                          {customer.email}
                        </span>
                        <span className="bg-[var(--baladi-primary)]/10 rounded-full px-2 py-0.5 text-xs font-medium text-[var(--baladi-primary)]">
                          {customer.userType}
                        </span>
                      </div>
                    </div>

                    <Check
                      className={cn(
                        'h-4 w-4 transition-opacity',
                        selectedCustomer?._id === customer._id
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

export default memo(CustomerSearchCombobox);
