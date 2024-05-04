import type { ProgressBarProps } from './components/progress-bar';

/**
 * 0 to 1
 */
export type ProgressValue = number;

export interface XLaneOptions {
  /**
   * Defaults to `30` (Depend on terminal size).
   */
  progressBarSize?: ProgressBarProps['progressBarSize'];
}
