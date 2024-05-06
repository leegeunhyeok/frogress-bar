import type { SharedValue } from '../types';

export function createSharedValue<T>(
  getter: SharedValue<T>['value'],
): SharedValue<T> {
  return { value: getter };
}
