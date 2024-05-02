import React from 'react';
import { render } from 'ink';
import { ProgressBar } from './components/progress-bar';

export function start(): Promise<void> {
  return render(
    React.createElement(ProgressBar, { value: 0.4 }),
  ).waitUntilExit();
}
