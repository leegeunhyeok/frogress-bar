import { createRef } from 'react';
import { render, type Instance } from 'ink';
import { ProgressState } from './progress-state';
import type { FrogressConfig } from './types';
import type { ContainerOptions, ContainerProps } from './components/container';
import { ProgressBar } from './progress-bar';
import { createContainerElement } from './utils/create-container';
import { DEFAULT_REFRESH_RATE } from './constants';

interface FrogressManager {
  create: (config?: FrogressConfig) => ProgressBar;
  remove: (progressBar: ProgressBar) => void;
  removeAll: () => void;
  setOptions: (options: ContainerOptions) => void;
}

export function initialize(): FrogressManager {
  let id = 0;
  let instance: Instance | null = null;

  const state = new ProgressState();
  const stateRef = createRef<ProgressState>();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- allow
  // @ts-expect-error
  stateRef.current = state;

  let containerProps: Required<ContainerProps & ContainerOptions> = {
    INTERNAL__stateRef: stateRef,
    INTERNAL__blockRefresh: false,
    refreshRate: DEFAULT_REFRESH_RATE,
  };

  function renderContainer(
    additionalProps?: Partial<ContainerProps & ContainerOptions>,
  ): void {
    if (instance !== null) return;

    instance = render(
      createContainerElement({ ...containerProps, ...additionalProps }),
    );
  }

  function rerenderContainer(
    additionalProps?: Partial<ContainerProps & ContainerOptions>,
  ): void {
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
    create: ({ total, template, placeholder } = {}) => {
      const needFirstRender = state.size() === 0;
      const progressBar = new ProgressBar(id++, {
        total,
        template,
        placeholder,
      });

      if (needFirstRender) {
        renderContainer();
      } else {
        rerenderContainer();
      }

      state.add(progressBar);

      return progressBar;
    },
    remove: (progressBar) => {
      if (state.size() === 0) {
        unmountContainer();
      } else {
        rerenderContainer();
      }

      state.remove(progressBar);
    },
    removeAll: () => {
      unmountContainer();

      state.clear();
    },
    setOptions: (options) => {
      containerProps = { ...containerProps, ...options };
      rerenderContainer();
    },
  };
}
