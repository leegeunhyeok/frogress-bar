import type { ProgressBar } from './progress-bar';

export class ProgressState {
  private progressBars = new Set<ProgressBar>();

  add(progressBar: ProgressBar): void {
    this.progressBars.add(progressBar);
  }

  remove(progressBar: ProgressBar): void {
    this.progressBars.delete(progressBar);
  }

  getValues(): IterableIterator<ProgressBar> {
    return this.progressBars.values();
  }

  size(): number {
    return this.progressBars.size;
  }

  clear(): void {
    this.progressBars.clear();
  }
}
