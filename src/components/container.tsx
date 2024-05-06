import React from 'react';
import { TerminalSizeProvider } from '../contexts/terminal-size';
import { useSharedValue } from '../hooks/use-shared-value';
import { useRefreshRate } from '../hooks/use-refresh-rate';
import type { ProgressBarState } from '../progress-bar';
import type { SharedValue } from '../types';
import { ProgressBar, type ProgressBarProps } from './progress-bar';

export interface ContainerProps {
  INTERNAL__blockRefresh: boolean;
  INTERNAL__sharedGetProgressBarStates: SharedValue<ProgressBarState[]>;
  progressBarSize: ProgressBarProps['progressBarSize'];
  activeChar: ProgressBarProps['activeChar'];
  inactiveChar: ProgressBarProps['inactiveChar'];
  refreshRate: number;
}

const noop = (): void => void 0;

export function Container({
  INTERNAL__blockRefresh,
  INTERNAL__sharedGetProgressBarStates,
  refreshRate,
  ...additionalProgressProps
}: ContainerProps): React.JSX.Element {
  const { value: progressBarStates, syncValue } = useSharedValue({
    sharedValue: INTERNAL__sharedGetProgressBarStates,
  });

  useRefreshRate({
    refreshRate,
    handler: INTERNAL__blockRefresh ? noop : syncValue,
  });

  return (
    <TerminalSizeProvider>
      {progressBarStates.map(({ id, active, ...progressProps }) =>
        active ? (
          <ProgressBar
            key={id}
            {...progressProps}
            {...additionalProgressProps}
          />
        ) : null,
      )}
    </TerminalSizeProvider>
  );
}
