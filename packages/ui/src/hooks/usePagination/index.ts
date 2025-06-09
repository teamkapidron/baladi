import { useCallback, useMemo } from 'react';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

export function usePagination() {
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const paginationInfo = useMemo(() => {
    return {
      page: getParam('page') ?? '1',
      limit: getParam('limit') ?? '10',
    };
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

  return {
    paginationInfo,
    handlePageSizeChange,
    handlePageChange,
  };
}
