import { useCallback, useMemo } from 'react';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

export function usePagination() {
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const page = useMemo(() => {
    return getParam('page') ?? '1';
  }, [getParam]);

  const limit = useMemo(() => {
    return getParam('limit') ?? '10';
  }, [getParam]);

  const handlePageSizeChange = useCallback(
    (size: number) => {
      updateParams({ limit: size.toString() });
    },
    [updateParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateParams({ page: page.toString() });
    },
    [updateParams],
  );

  const goToNextPage = useCallback(() => {
    updateParams({ page: (Number(page) + 1).toString() });
  }, [updateParams, page]);

  const goToPreviousPage = useCallback(() => {
    updateParams({ page: (Number(page) - 1).toString() });
  }, [updateParams, page]);

  return {
    page,
    limit,
    handlePageSizeChange,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
  };
}
