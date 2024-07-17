import {
  DEFAULT_ACTIVE_CHAR,
  DEFAULT_INACTIVE_CHAR,
  DEFAULT_PROGRESS_BAR_SIZE,
  DEFAULT_REFRESH_RATE,
} from '../constants';
import type { FrogressOptions } from '../types';

export function getDefaultOptions(
  options: FrogressOptions,
): Required<FrogressOptions> {
  return {
    activeChar: options.activeChar ?? DEFAULT_ACTIVE_CHAR,
    inactiveChar: options.inactiveChar ?? DEFAULT_INACTIVE_CHAR,
    progressBarSize: options.progressBarSize ?? DEFAULT_PROGRESS_BAR_SIZE,
    refreshRate: options.refreshRate ?? DEFAULT_REFRESH_RATE,
  };
}
