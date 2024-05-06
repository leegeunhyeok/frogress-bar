import { useState, useCallback } from 'react';
import type { SharedValue } from '../types';

interface UseSharedValue<T> {
  sharedValue: SharedValue<T>;
}

interface UseSharedValueResult<T> {
  value: T;
  syncValue: () => void;
}

export function useSharedValue<T>({
  sharedValue,
}: UseSharedValue<T>): UseSharedValueResult<T> {
  const [value, setValue] = useState(sharedValue.value());

  const syncValue = useCallback(() => {
    setValue(sharedValue.value());
  }, [sharedValue]);

  return { value, syncValue };
}
