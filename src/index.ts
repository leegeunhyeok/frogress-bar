import React from 'react';
import { render } from 'ink';
import { WorkingInProgress } from './working-in-progress';

export function start(): Promise<void> {
  return render(React.createElement(WorkingInProgress)).waitUntilExit();
}
