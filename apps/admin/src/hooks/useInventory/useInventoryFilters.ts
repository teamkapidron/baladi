import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef } from 'react';
import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';

export enum InventoryFilter {
  PRODUCT_NAME = 'productName',
  STATUS = 'status',
}

export enum InventoryStatus {
  ALL = 'all',
  IN_STOCK = 'in-stock',
  LOW_STOCK = 'low-stock',
  OUT_OF_STOCK = 'out-of-stock',
}

export function useInventoryFilters(debounceDelay = 400) {
  const [search, setSearch] = useQueryState('search', parseAsString);
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<InventoryStatus>(
      Object.values(InventoryStatus),
    ).withDefault(InventoryStatus.ALL),
  );

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string) => {
      if (search === '') {
        setSearch(null);
      } else {
        setSearch(search);
      }
    }, debounceDelay),
  );

  useEffect(() => {
    const searchUpdateRef = debouncedSearchUpdateRef.current;

    return () => {
      searchUpdateRef.cancel();
    };
  }, []);

  const handleSearchFilterChange = useCallback((search: string) => {
    debouncedSearchUpdateRef.current(search);
  }, []);

  const handleStatusFilterChange = useCallback(
    (status: InventoryStatus) => {
      if (status === InventoryStatus.ALL) {
        setStatus(null);
      } else {
        setStatus(status);
      }
    },
    [setStatus],
  );

  return { search, status, handleSearchFilterChange, handleStatusFilterChange };
}
