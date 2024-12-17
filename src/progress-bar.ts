import type { FrogressConfig, PlaceholderConfig } from './types';
import type { ProgressBarProps } from './components/progress-bar';
import { getDefaultConfig } from './utils/get-default-config';

export interface ProgressBarState extends ProgressBarProps {
  id: number;
  active: boolean;
}

interface ProgressValues {
  /**
   * Current progress value.
   */
  value: number;
  /**
   * Total progress value.
   */
  total?: number;
  /**
   * Key-Value data that replace of template's placeholders.
   */
  placeholder?: PlaceholderConfig;
}

export class ProgressBar {
  private active = false;
  private value = 0;
  private total: number;
  private placeholder?: PlaceholderConfig;
  private config: Required<Omit<FrogressConfig, 'value' | 'total' | 'placeholder'>>;

  constructor(
    private id: number,
    config: FrogressConfig,
  ) {
    const completeConfig = getDefaultConfig(config);
    const { value, total, placeholder, ...rest } = completeConfig;
    this.value = value;
    this.total = total;
    this.placeholder = placeholder;
    this.config = rest;
  }

  start({ value, total, placeholder }: ProgressValues): void {
    this.update({ value, total, placeholder });
    this.active = true;
  }

  stop(): void {
    this.active = false;
  }

  update({ value, total, placeholder }: ProgressValues): void {
    this.value = value;

    if (typeof total === 'number') {
      this.total = total;
    }

    if (typeof placeholder === 'object') {
      this.placeholder = {
        ...this.placeholder,
        ...placeholder,
      };
    }
  }

  getState(): ProgressBarState {
    return {
      ...this.config,
      id: this.id,
      value: this.value,
      total: this.total,
      active: this.active,
      placeholder: this.placeholder,
    };
  }
}
