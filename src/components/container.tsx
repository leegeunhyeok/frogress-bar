import React, { useCallback } from 'react';
import { TerminalSizeProvider } from '../contexts/terminal-size';
import type { INTERNAL__ProgressStateProxy, XLaneOptions } from '../types';
import { useRefreshRate } from '../hooks/use-refresh-rate';
import { DEFAULT_REFRESH_RATE } from '../constants';
import { ProgressBar } from './progress-bar';

export interface ContainerProps {
  INTERNAL__progressStateProxies: INTERNAL__ProgressStateProxy[];
  progressBarSize: XLaneOptions['progressBarSize'];
  refreshRate: XLaneOptions['refreshRate'];
}

export function Container({
  INTERNAL__progressStateProxies,
  progressBarSize,
  refreshRate = DEFAULT_REFRESH_RATE,
}: ContainerProps): React.JSX.Element {
  const refreshHandler = useCallback(() => {
    // TODO
  }, []);

  useRefreshRate({ refreshRate, handler: refreshHandler });

  return (
    <TerminalSizeProvider>
      {INTERNAL__progressStateProxies.map(({ __name, value, total }) => (
        <ProgressBar
          key={__name}
          value={Math.min(value / total, 1)}
          progressBarSize={progressBarSize}
        />
      ))}
    </TerminalSizeProvider>
  );
}
