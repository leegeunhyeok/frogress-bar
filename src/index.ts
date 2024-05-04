import React from 'react';
import { render } from 'ink';
import { Container } from './components/container';

export function start(): Promise<void> {
  return render(React.createElement(Container)).waitUntilExit();
}
