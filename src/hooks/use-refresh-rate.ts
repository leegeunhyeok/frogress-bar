import { useLayoutEffect } from 'react';

interface UseRefreshRate {
  refreshRate: number;
  handler: () => void;
}

export function useRefreshRate({ refreshRate, handler }: UseRefreshRate): void {
  useLayoutEffect(() => {
    const timer = setInterval(() => {
      handler();
    }, refreshRate);

    return () => {
      clearInterval(timer);
      handler();
    };
  }, [refreshRate, handler]);
}
