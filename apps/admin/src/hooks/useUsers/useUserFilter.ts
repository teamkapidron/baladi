import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGetParams, useUpdateParams } from '@repo/ui/hooks/useParams';

import { UserType } from '@repo/types/user';
import { UserStatusFilter } from './types';

export enum UserFilter {
  NAME = 'name',
  EMAIL = 'email',
  USER_TYPE = 'userType',
  STATUS = 'status',
}

export function useUserFilter(debounceDelay = 400) {
  const { getParam } = useGetParams();
  const updateParams = useUpdateParams();

  const userFilter = useMemo(() => {
    return {
      name: getParam('name') ?? undefined,
      email: getParam('email') ?? undefined,
      userType: (getParam('userType') as UserType) ?? undefined,
      status: (getParam('status') as UserStatusFilter) ?? UserStatusFilter.ALL,
    };
  }, [getParam]);

  const debouncedNameUpdateRef = useRef(
    debounce((name: string) => {
      updateParams({ name });
    }, debounceDelay),
  );

  const debouncedEmailUpdateRef = useRef(
    debounce((email: string) => {
      updateParams({ email });
    }, debounceDelay),
  );

  useEffect(() => {
    const nameUpdateRef = debouncedNameUpdateRef.current;
    const emailUpdateRef = debouncedEmailUpdateRef.current;

    return () => {
      nameUpdateRef.cancel();
      emailUpdateRef.cancel();
    };
  }, []);

  const handleUserFilterChange = useCallback(
    (filter: UserFilter, value: string) => {
      if (filter === UserFilter.NAME) {
        debouncedNameUpdateRef.current(value);
      } else if (filter === UserFilter.EMAIL) {
        debouncedEmailUpdateRef.current(value);
      } else {
        updateParams({ [filter]: value });
      }
    },
    [updateParams],
  );

  const handleUserStatusFilterChange = useCallback(
    (status: UserStatusFilter) => {
      handleUserFilterChange(UserFilter.STATUS, status);
    },
    [handleUserFilterChange],
  );

  const handleUserTypeFilterChange = useCallback(
    (userType: UserType) => {
      handleUserFilterChange(UserFilter.USER_TYPE, userType);
    },
    [handleUserFilterChange],
  );

  const handleUserEmailFilterChange = useCallback(
    (email: string) => {
      handleUserFilterChange(UserFilter.EMAIL, email);
    },
    [handleUserFilterChange],
  );

  const handleUserNameFilterChange = useCallback(
    (name: string) => {
      handleUserFilterChange(UserFilter.NAME, name);
    },
    [handleUserFilterChange],
  );

  return {
    userFilter,

    handleUserStatusFilterChange,
    handleUserTypeFilterChange,
    handleUserEmailFilterChange,
    handleUserNameFilterChange,
  };
}
