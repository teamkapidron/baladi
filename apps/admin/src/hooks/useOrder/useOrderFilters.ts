import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

import { OrderStatusFilter } from './types';

export function useOrderFilters(debounceDelay = 400) {
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const status = useMemo(() => {
    return (getParam('status') as OrderStatusFilter) ?? OrderStatusFilter.ALL;
  }, [getParam]);

  const search = useMemo(() => {
    return getParam('search') as string;
  }, [getParam]);

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string) => {
      updateParams({ search });
    }, debounceDelay),
  );

  useEffect(() => {
    return () => {
      debouncedSearchUpdateRef.current.cancel();
    };
  }, []);

  const handleStatusFilterChange = useCallback((status: OrderStatusFilter) => {
    updateParams({ status });
  }, []);

  const handleSearchFilterChange = useCallback((search: string) => {
    debouncedSearchUpdateRef.current(search);
  }, []);

  return {
    status,
    handleStatusFilterChange,

    search,
    handleSearchFilterChange,
  };
}
