import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';
import { Visibility } from '@repo/types/product';

export function useProductFilters(debounceDelay = 400) {
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const search = useMemo(() => {
    return getParam('search') ?? undefined;
  }, [getParam]);

  const category = useMemo(() => {
    return getParam('category') ?? undefined;
  }, [getParam]);

  const visibility = useMemo(() => {
    return getParam('visibility') as Visibility;
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

  const handleCategoryFilterChange = useCallback(
    (category: string) => {
      updateParams({ category });
    },
    [updateParams],
  );

  return {
    visibility,

    search,
    handleSearchFilterChange,

    category,
    handleCategoryFilterChange,
  };
}
