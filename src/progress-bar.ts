import type { PlaceholderConfig } from './utils/templates';

export interface ProgressBarState {
  id: number;
  value: number;
  total: number;
  active: boolean;
  template?: string;
  placeholderConfig?: PlaceholderConfig;
}

interface ProgressBarOptions {
  value: number;
  total?: number;
  placeholder?: PlaceholderConfig;
}

export class ProgressBar {
  private active = false;
  private value = 0;
  private total: number;
  private template?: string;
  private placeholderConfig?: PlaceholderConfig;

  constructor(
    private id: number,
    {
      total,
      template,
      placeholder,
    }: {
      total: number;
      template?: string;
      placeholder?: PlaceholderConfig;
    },
  ) {
    this.total = total;
    this.template = template;
    this.placeholderConfig = placeholder;
  }

  start({ value, total, placeholder }: ProgressBarOptions): void {
    this.update({ value, total, placeholder });
    this.active = true;
  }

  stop(): void {
    this.active = false;
  }

  update({ value, total, placeholder }: ProgressBarOptions): void {
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
      id: this.id,
      value: this.value,
      total: this.total,
      active: this.active,
      template: this.template,
      placeholderConfig: this.placeholderConfig,
    };
  }
}
