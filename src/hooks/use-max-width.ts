import { useMemo } from 'react';
import { interpolate } from '../utils/interpolate';

export function useMaxWidth(maxWidth: number): number {
  return useMemo(() => {
    /**
     * TODO: Calculate based on terminal width
     */
    const shouldInterpolate = false;
    const terminalWidth = 100;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- todo
    return shouldInterpolate
      ? interpolate(terminalWidth / maxWidth, { from: 0, to: terminalWidth })
      : maxWidth;
  }, [maxWidth]);
}
