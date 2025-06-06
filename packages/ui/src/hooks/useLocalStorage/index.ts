import { useState, useEffect, useCallback } from 'react';
import type { SetValue, UseLocalStorageReturn } from './types';

const isBrowser = typeof window !== 'undefined';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) return initialValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser) return;

    try {
      const item = localStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;

      if (JSON.stringify(storedValue) !== JSON.stringify(value)) {
        setStoredValue(value);
      }
    } catch {}
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (isBrowser) {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch {}
    },
    [key, storedValue],
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);

    if (isBrowser) {
      localStorage.removeItem(key);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
