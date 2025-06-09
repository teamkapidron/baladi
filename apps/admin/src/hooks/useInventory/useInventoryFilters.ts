import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

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
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const search = useMemo(() => {
    return getParam('search') ?? undefined;
  }, [getParam]);

  const status = useMemo(() => {
    return (getParam('status') as InventoryStatus) ?? InventoryStatus.ALL;
  }, [getParam]);

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string) => {
      updateParams({ search });
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
      updateParams({ status });
    },
    [updateParams],
  );

  return { search, status, handleSearchFilterChange, handleStatusFilterChange };
}
