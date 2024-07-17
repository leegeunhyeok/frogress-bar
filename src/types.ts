import type { ContainerProps } from './components/container';
import type { ProgressBarProps } from './components/progress-bar';

export interface FrogressOptions {
  /**
   * Defaults to `50` (Depend on terminal size).
   */
  progressBarSize?: ProgressBarProps['progressBarSize'];
  /**
   * Defaults to `'█'`.
   */
  activeChar?: ProgressBarProps['activeChar'];
  /**
   * Defaults to `'░'`.
   */
  inactiveChar?: ProgressBarProps['inactiveChar'];
  /**
   * Defaults to `50`.
   */
  refreshRate?: ContainerProps['refreshRate'];
}
