import type { FrogressConfig, PlaceholderConfig } from './types';
import type { ProgressBarProps } from './components/progress-bar';
import { getDefaultConfig } from './utils/get-default-config';

export interface ProgressBarState extends ProgressBarProps {
  id: number;
  active: boolean;
}

interface ProgressValues {
  value: number;
  total?: number;
  placeholder?: PlaceholderConfig;
}

export class ProgressBar {
  private active = false;
  private value = 0;
  private total: number;
  private placeholderConfig?: PlaceholderConfig;
  private config: Required<Omit<FrogressConfig, 'value' | 'total'>>;

  constructor(
    private id: number,
    config: FrogressConfig,
  ) {
    const completeConfig = getDefaultConfig(config);
    const { value, total, ...rest } = completeConfig;
    this.value = value;
    this.total = total;
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
      this.placeholderConfig = {
        ...this.placeholderConfig,
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
    };
  }
}
