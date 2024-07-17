import { useState, useCallback, useReducer, type RefObject } from 'react';

interface UseSharedValueResult<T> {
  value: T;
  updateState: () => void;
}

function getRefValue<T>(ref: RefObject<T>): NonNullable<T> {
  if (ref.current == null) {
    throw new Error('ref value cannot be empty');
  }
  return ref.current;
}

export function useRefAsState<T>({
  ref,
}: {
  ref: RefObject<T>;
}): UseSharedValueResult<T> {
  const [, rerender] = useReducer((value) => !value, true);
  const [value, setValue] = useState(getRefValue(ref));

  const updateState = useCallback(() => {
    setValue(getRefValue(ref));
    rerender();
  }, [ref]);

  return { value, updateState };
}
