import type { ProgressBarProps } from './components/progress-bar.js';

export interface ProgressConfig {
  /**
   * Defaults to `0`.
   */
  value?: number;
  /**
   * Defaults to `100`.
   */
  total?: number;
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
   * Template string.
   *
   * Defaults to `'{progress}'`.
   */
  template?: string;
  /**
   * Key-Value data that replace of template's placeholders.
   *
   * Defaults to `{}`.
   */
  placeholder?: Placeholder;
}

export type Placeholder = Record<string, string>;

export const COLOR = Symbol('color');
export const COLOR_ONLY = Symbol('color-only');
