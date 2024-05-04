import { type Instance, render } from 'ink';
import type { ProgressName, ProgressState, XLaneOptions } from './types';
import { createContainerElement } from './utils/create-container';

interface XLane {
  start: () => void;
  stop: () => void;
  update: (name: ProgressName, newState: ProgressState) => void;
}

export function xLane(options: XLaneOptions): XLane {
  let instance: Instance | null = null;

  function renderContainer(): void {
    if (instance) {
      return;
    }

    instance = render(
      createContainerElement({
        progressBarSize: options.progressBarSize,
        refreshRate: options.refreshRate,
        INTERNAL__progressStateProxies: Object.entries(options.progresses).map(
          ([key, value]) => ({ ...value, __name: key }),
        ),
      }),
    );
  }

  function unmountContainer(): void {
    instance?.unmount();
    instance = null;
  }

  return {
    start: () => {
      renderContainer();
    },
    stop: () => {
      unmountContainer();
    },
    update: (_name, _newState) => {
      // TODO
    },
  };
}
