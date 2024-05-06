import { render, type Instance } from 'ink';
import { ProgressBar } from './progress-bar';
import { ProgressBarPool } from './progress-bar-pool';
import { createContainerElement } from './utils/create-container';
import { createSharedValue } from './utils/create-shared-value';
import { getDefaultOptions } from './utils/get-default-options';
import type { ContainerProps } from './components/container';
import type { TemplateValues } from './utils/templates';
import type { XLaneOptions } from './types';

interface XLane {
  add: (progressConfig: {
    total: number;
    template?: string;
    templateValues?: TemplateValues;
  }) => ProgressBar;
  remove: (progressBar: ProgressBar) => void;
  removeAll: () => void;
}

export function xLane(options: XLaneOptions): XLane {
  let id = 0;
  let instance: Instance | null = null;

  const mergedOptions = getDefaultOptions(options);
  const containerProps: ContainerProps = {
    INTERNAL__blockRefresh: false,
    INTERNAL__sharedGetProgressBarStates: createSharedValue(() =>
      [...pool.getValues()].map((progressBar) => progressBar.getState()),
    ),
    ...mergedOptions,
  };

  const pool = new ProgressBarPool();

  function renderContainer(additionalProps?: Partial<ContainerProps>): void {
    if (instance !== null) return;

    instance = render(
      createContainerElement({ ...containerProps, ...additionalProps }),
    );
  }

  function rerenderContainer(additionalProps?: Partial<ContainerProps>): void {
    if (instance === null) return;

    instance.rerender(
      createContainerElement({ ...containerProps, ...additionalProps }),
    );
  }

  function unmountContainer(): void {
    rerenderContainer({ INTERNAL__blockRefresh: true });

    instance?.unmount();
    instance = null;
  }

  return {
    add: ({ total, template, templateValues }) => {
      const needFirstRender = pool.size() === 0;
      const progressBar = new ProgressBar(id++, {
        total,
        template,
        templateValues,
      });

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
      unmountContainer();

      pool.clear();
    },
  };
}
