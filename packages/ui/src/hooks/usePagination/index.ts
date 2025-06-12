import { useCallback } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

export function usePagination() {
  const [page, setPage] = useQueryState('page', parseAsString.withDefault('1'));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsString.withDefault('10'),
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setLimit(size.toString());
    },
    [setLimit],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page.toString());
    },
    [setPage],
  );

  const goToNextPage = useCallback(() => {
    setPage((Number(page) + 1).toString());
  }, [setPage, page]);

  const goToPreviousPage = useCallback(() => {
    setPage((Number(page) - 1).toString());
  }, [setPage, page]);

  return {
    page,
    limit,
    handlePageSizeChange,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
  };
}
