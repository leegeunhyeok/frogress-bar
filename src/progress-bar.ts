import type { TemplateValues } from './utils/templates';

export interface ProgressBarState {
  id: number;
  value: number;
  total: number;
  active: boolean;
  template?: string;
  templateValues?: TemplateValues;
}

export class ProgressBar {
  private active = false;
  private value = 0;
  private total: number;
  private template?: string;
  private templateValues?: TemplateValues;

  constructor(
    private id: number,
    {
      total,
      template,
      templateValues,
    }: {
      total: number;
      template?: string;
      templateValues?: TemplateValues;
    },
  ) {
    this.total = total;
    this.template = template;
    this.templateValues = templateValues;
  }

  start({
    value,
    total,
    templateValues,
  }: {
    value: number;
    total?: number;
    templateValues?: TemplateValues;
  }): void {
    this.update({ value, total, templateValues });
    this.active = true;
  }

  stop(): void {
    this.active = false;
  }

  update({
    value,
    total,
    templateValues,
  }: {
    value: number;
    total?: number;
    templateValues?: TemplateValues;
  }): void {
    this.value = value;

    if (typeof total === 'number') {
      this.total = total;
    }

    if (typeof templateValues === 'object') {
      this.templateValues = {
        ...this.templateValues,
        ...templateValues,
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
      templateValues: this.templateValues,
    };
  }
}
