import { render, type Instance } from 'ink';
import { ProgressBar } from './progress-bar';
import { ProgressBarPool } from './progress-bar-pool';
import { createContainerElement } from './utils/create-container';
import { createSharedValue } from './utils/create-shared-value';
import { getDefaultOptions } from './utils/get-default-options';
import type { XLaneOptions } from './types';

interface XLane {
  add: (total: number) => ProgressBar;
  remove: (progressBar: ProgressBar) => void;
  removeAll: () => void;
}

export function xLane(options: XLaneOptions): XLane {
  let id = 0;
  let instance: Instance | null = null;

  const mergedOptions = getDefaultOptions(options);
  const containerProps = {
    INTERNAL__sharedGetProgressBarStates: createSharedValue(() =>
      [...pool.getValues()].map((progressBar) => progressBar.getState()),
    ),
    ...mergedOptions,
  } as const;

  const pool = new ProgressBarPool();

  function renderContainer(): void {
    if (instance !== null) return;

    instance = render(createContainerElement(containerProps));
  }

  function rerenderContainer(): void {
    if (instance === null) return;

    instance.rerender(createContainerElement(containerProps));
  }

  function unmountContainer(): void {
    instance?.unmount();
    instance = null;
  }

  return {
    add: (total) => {
      const needFirstRender = pool.size() === 0;
      const progressBar = new ProgressBar(id++, total);

      pool.add(progressBar);

      if (needFirstRender) {
        renderContainer();
      } else {
        rerenderContainer();
      }

      return progressBar;
    },
    remove: (progressBar) => {
      pool.remove(progressBar);

      if (pool.size() === 0) {
        unmountContainer();
      } else {
        rerenderContainer();
      }
    },
    removeAll: () => {
      pool.clear();

      // TODO: unmount after last re-render phase
      setTimeout(() => {
        unmountContainer();
      }, mergedOptions.refreshRate);
    },
  };
}
