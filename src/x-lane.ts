import { createRef } from 'react';
import { render, type Instance } from 'ink';
import { ProgressBar } from './progress-bar';
import { ProgressState } from './progress-state';
import { createContainerElement } from './utils/create-container';
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

  const state = new ProgressState();
  const stateRef = createRef<ProgressState>();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- allow
  // @ts-expect-error
  stateRef.current = state;

  const mergedOptions = getDefaultOptions(options);
  const containerProps: ContainerProps = {
    INTERNAL__stateRef: stateRef,
    INTERNAL__blockRefresh: false,
    ...mergedOptions,
  };

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
      const needFirstRender = state.size() === 0;
      const progressBar = new ProgressBar(id++, {
        total,
        template,
        templateValues,
      });

      state.add(progressBar);

      if (needFirstRender) {
        renderContainer();
      } else {
        rerenderContainer();
      }

      return progressBar;
    },
    remove: (progressBar) => {
      state.remove(progressBar);

      if (state.size() === 0) {
        unmountContainer();
      } else {
        rerenderContainer();
      }
    },
    removeAll: () => {
      unmountContainer();

      state.clear();
    },
  };
}
