'use client';

import { useCallback, useMemo } from 'react';
import { subDays, format, parse } from 'date-fns';
import { useGetParams, useUpdateParams } from '../useParams';

export function useDateRangeInParams(timeRange: number = 30) {
  const { getParam } = useGetParams();
  const updateParam = useUpdateParams();

  const dateRange = useMemo(() => {
    const from =
      getParam('from') ?? format(subDays(new Date(), timeRange), 'yyyy-MM-dd');
    const to = getParam('to') ?? format(new Date(), 'yyyy-MM-dd');

    const fromDate = parse(from, 'yyyy-MM-dd', new Date());
    const toDate = parse(to, 'yyyy-MM-dd', new Date());

    return { from: fromDate, to: toDate };
  }, [getParam]);

  const setDateRange = useCallback(
    (from: Date, to: Date) => {
      updateParam({
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
      });
    },
    [updateParam],
  );

  return { dateRange, setDateRange };
}
