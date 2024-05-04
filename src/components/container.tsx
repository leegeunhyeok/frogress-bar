import React from 'react';
import { TerminalSizeProvider } from '../contexts/terminal-size';
import type { XLaneOptions } from '../types';
import { ProgressBar } from './progress-bar';

export function Container({
  progressBarSize,
}: XLaneOptions): React.JSX.Element {
  return (
    <TerminalSizeProvider>
      <ProgressBar value={0.3} progressBarSize={progressBarSize} />
      <ProgressBar value={0.7} progressBarSize={progressBarSize} />
    </TerminalSizeProvider>
  );
}
