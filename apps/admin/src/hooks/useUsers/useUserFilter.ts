import debounce from 'lodash.debounce';
import { parseAsString, useQueryState, parseAsStringEnum } from 'nuqs';
import { useCallback, useEffect, useRef } from 'react';

import { UserType } from '@repo/types/user';
import { UserStatusFilter } from './types';

export enum UserFilter {
  NAME = 'name',
  EMAIL = 'email',
  USER_TYPE = 'userType',
  STATUS = 'status',
}

export function useUserFilter(debounceDelay = 400) {
  const [name, setName] = useQueryState('name', parseAsString);
  const [email, setEmail] = useQueryState('email', parseAsString);
  const [userType, setUserType] = useQueryState(
    'userType',
    parseAsStringEnum<UserType>(Object.values(UserType)),
  );
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<UserStatusFilter>(
      Object.values(UserStatusFilter),
    ).withDefault(UserStatusFilter.ALL),
  );

  const debouncedNameUpdateRef = useRef(
    debounce((name: string) => {
      setName(name);
    }, debounceDelay),
  );

  const debouncedEmailUpdateRef = useRef(
    debounce((email: string) => {
      setEmail(email);
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
      } else if (filter === UserFilter.USER_TYPE) {
        setUserType(value as UserType);
      } else if (filter === UserFilter.STATUS) {
        setStatus(value as UserStatusFilter);
      }
    },
    [setUserType, setStatus],
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
    userFilter: {
      name: name ?? undefined,
      email: email ?? undefined,
      userType: userType ?? undefined,
      status,
    },

    handleUserStatusFilterChange,
    handleUserTypeFilterChange,
    handleUserEmailFilterChange,
    handleUserNameFilterChange,
  };
}
