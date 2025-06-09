'use client';

import { useCallback, useMemo } from 'react';
import { subDays, format, parse } from '@repo/ui/lib/date';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

export function useDateRangeInParams(timeRange: number = 30) {
  const { getParam } = useGetParams();
  const updateParam = useUpdateParams();

  const fromString = useMemo(() => {
    return (
      getParam('from') ?? format(subDays(new Date(), timeRange), 'yyyy-MM-dd')
    );
  }, [timeRange]);

  const toString = useMemo(
    () => getParam('to') ?? format(new Date(), 'yyyy-MM-dd'),
    [],
  );

  const dateRange = useMemo(() => {
    const fromDate = parse(fromString, 'yyyy-MM-dd', new Date());
    const toDate = parse(toString, 'yyyy-MM-dd', new Date());
    return { from: fromDate, to: toDate };
  }, [fromString, toString]);

  const dateRangeInString = useMemo(() => {
    return {
      from: fromString,
      to: toString,
    };
  }, [fromString, toString]);

  const setDateRange = useCallback(
    (from: Date, to: Date) => {
      updateParam({
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
      });
    },
    [updateParam],
  );

  return { dateRange, dateRangeInString, setDateRange };
}
