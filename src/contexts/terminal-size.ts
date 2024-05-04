import { useStdout } from 'ink';
import React, { createContext, useState, type ReactNode } from 'react';

interface TerminalSizeContextValue {
  columns: number;
  setColumns: (columns: number) => void;
}

const context = createContext<TerminalSizeContextValue>({
  columns: 0,
  setColumns: () => undefined,
});

export function TerminalSizeProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const { stdout } = useStdout();
  const [columns, setColumns] = useState(
    stdout?.columns ?? process.stdout.columns,
  );

  const defaultValue: TerminalSizeContextValue = {
    columns,
    setColumns,
  };

  return React.createElement(
    context.Provider,
    { value: defaultValue },
    children,
  );
}

export const terminalSizeContext = context;
