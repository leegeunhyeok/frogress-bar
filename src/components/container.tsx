import React from 'react';
import { TerminalSizeProvider } from '../contexts/terminal-size';
import { useSharedValue } from '../hooks/use-shared-value';
import { useRefreshRate } from '../hooks/use-refresh-rate';
import type { ProgressBarState } from '../progress-bar';
import type { SharedValue } from '../types';
import { ProgressBar, type ProgressBarProps } from './progress-bar';

export interface ContainerProps {
  INTERNAL__sharedGetProgressBarStates: SharedValue<ProgressBarState[]>;
  progressBarSize: ProgressBarProps['progressBarSize'];
  activeChar: ProgressBarProps['activeChar'];
  inactiveChar: ProgressBarProps['inactiveChar'];
  refreshRate: number;
}

export function Container({
  INTERNAL__sharedGetProgressBarStates,
  refreshRate,
  ...progressProps
}: ContainerProps): React.JSX.Element {
  const { value: progressBarStates, syncValue } = useSharedValue({
    sharedValue: INTERNAL__sharedGetProgressBarStates,
  });

  useRefreshRate({ refreshRate, handler: syncValue });

  return (
    <TerminalSizeProvider>
      {progressBarStates.map(({ id, value, total, active }) =>
        active ? (
          <ProgressBar
            key={id}
            value={Math.min(value / total, 1)}
            {...progressProps}
          />
        ) : null,
      )}
    </TerminalSizeProvider>
  );
}
