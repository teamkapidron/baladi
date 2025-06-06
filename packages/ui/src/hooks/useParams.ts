'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (paramsToUpdate: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.keys(paramsToUpdate).forEach((key) => {
        const value = paramsToUpdate[key];
        if (value !== null && value !== undefined) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return updateQueryString;
}

export function useGetParams() {
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams],
  );

  const getAllParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [searchParams]);

  return {
    getParam,
    getAllParams,
  };
}
