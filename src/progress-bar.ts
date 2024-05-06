export interface ProgressBarState {
  id: number;
  value: number;
  total: number;
  active: boolean;
}

export class ProgressBar {
  private active = false;
  private value = 0;

  constructor(
    private id: number,
    private total: number,
  ) {}

  start(value: number, total?: number): void {
    this.update(value, total);
    this.active = true;
  }

  stop(): void {
    this.active = false;
  }

  update(value: number, total?: number): void {
    this.value = value;

    if (typeof total === 'number') {
      this.total = total;
    }
  }

  getState(): ProgressBarState {
    return {
      id: this.id,
      value: this.value,
      total: this.total,
      active: this.active,
    };
  }
}
