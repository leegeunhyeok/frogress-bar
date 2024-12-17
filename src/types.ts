import type { ProgressBarProps } from './components/progress-bar';

export interface FrogressConfig {
  /**
   * Defaults to `0`.
   */
  value?: number
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
  placeholder?: PlaceholderConfig;
}

export type PlaceholderConfig = Record<string, PlainText | ColoredText>;

export type PlainText = string;

export interface ColoredText {
  text?: PlainText;
  color: string;
}
