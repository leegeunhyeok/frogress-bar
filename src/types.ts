import type { ContainerProps } from './components/container';
import type { ProgressBarProps } from './components/progress-bar';

export interface SharedValue<T> {
  value: () => T;
}

/**
 * 0 to 1
 */
export type ProgressValue = number;
export type ProgressName = string;

export interface XLaneOptions {
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
   * Defaults to `50` (Depend on terminal size).
   */
  refreshRate?: ContainerProps['refreshRate'];
}
