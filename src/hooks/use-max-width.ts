import { useMemo } from 'react';
import { useTerminalSize } from './use-terminal-size.js';

export function useMaxWidth(maxWidth: number): number {
  const terminalWidth = useTerminalSize();

  return useMemo(
    () => Math.min(maxWidth, terminalWidth),
    [maxWidth, terminalWidth],
  );
}
