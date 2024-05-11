import React, { type RefObject } from 'react';
import { TerminalSizeProvider } from '../contexts/terminal-size';
import { useRefAsState } from '../hooks/use-ref-as-state';
import { useRefreshRate } from '../hooks/use-refresh-rate';
import type { ProgressState } from '../progress-state';
import { ProgressBar, type ProgressBarProps } from './progress-bar';

export interface ContainerProps {
  INTERNAL__blockRefresh: boolean;
  INTERNAL__stateRef: RefObject<ProgressState>;
  progressBarSize: ProgressBarProps['progressBarSize'];
  activeChar: ProgressBarProps['activeChar'];
  inactiveChar: ProgressBarProps['inactiveChar'];
  refreshRate: number;
}

const noop = (): void => void 0;

export function Container({
  INTERNAL__stateRef,
  INTERNAL__blockRefresh,
  refreshRate,
  ...additionalProgressProps
}: ContainerProps): React.JSX.Element {
  const { value: progressState, updateState } = useRefAsState({
    ref: INTERNAL__stateRef,
  });

  useRefreshRate({
    refreshRate,
    handler: INTERNAL__blockRefresh ? noop : updateState,
  });

  return (
    <TerminalSizeProvider>
      {[...progressState.getValues()].map((progress) => {
        const { id, active, ...progressProps } = progress.getState();

        return active ? (
          <ProgressBar
            key={id}
            {...progressProps}
            {...additionalProgressProps}
          />
        ) : null;
      })}
    </TerminalSizeProvider>
  );
}
