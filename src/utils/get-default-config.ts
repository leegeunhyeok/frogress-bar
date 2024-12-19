import {
  DEFAULT_ACTIVE_CHAR,
  DEFAULT_INACTIVE_CHAR,
  DEFAULT_PROGRESS_BAR_SIZE,
  DEFAULT_TEMPLATE,
  DEFAULT_TOTAL_VALUE,
  DEFAULT_VALUE,
} from '../constants/index.js';
import type { ProgressConfig } from '../types.js';

export function getDefaultConfig(
  config: ProgressConfig,
): Required<ProgressConfig> {
  return {
    value: config.value ?? DEFAULT_VALUE,
    total: config.total ?? DEFAULT_TOTAL_VALUE,
    activeChar: config.activeChar ?? DEFAULT_ACTIVE_CHAR,
    inactiveChar: config.inactiveChar ?? DEFAULT_INACTIVE_CHAR,
    progressBarSize: config.progressBarSize ?? DEFAULT_PROGRESS_BAR_SIZE,
    template: config.template ?? DEFAULT_TEMPLATE,
    placeholder: config.placeholder ?? {},
  };
}
