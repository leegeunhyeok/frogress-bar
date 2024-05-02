import type { ProgressValue } from '../types';

interface InterpolateRange {
  from: number;
  to: number;
}

export function interpolate(
  value: ProgressValue,
  range: InterpolateRange,
): number {
  return value * range.to + range.from;
}
