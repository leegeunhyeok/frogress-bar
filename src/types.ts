import type { ProgressBarProps } from './components/progress-bar';

export interface ProgressState {
  value: number;
  total: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- internal
export interface INTERNAL__ProgressStateProxy extends ProgressState {
  __name: ProgressName;
}

/**
 * 0 to 1
 */
export type ProgressValue = number;
export type ProgressName = string;

export interface XLaneOptions {
  /**
   * Progress states to render progress bar.
   */
  progresses: Record<ProgressName, ProgressState>;
  /**
   * Defaults to `100` (Depend on terminal size).
   */
  progressBarSize?: ProgressBarProps['progressBarSize'];
  /**
   * Defaults to `'█'`.
   */
  activeChar?: ProgressBarProps['activeChar'];
  /**
   * Defaults to `'█'`.
   */
  inactiveChar?: ProgressBarProps['inactiveChar'];
  /**
   * Defaults to `50`.
   */
  refreshRate?: number;
}
