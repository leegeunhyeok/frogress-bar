import { useStdout } from 'ink';
import { useContext, useLayoutEffect } from 'react';
import { terminalSizeContext } from '../contexts/terminal-size';

export function useTerminalSize(): number {
  const { stdout } = useStdout();
  const { columns, setColumns } = useContext(terminalSizeContext);

  useLayoutEffect(() => {
    const onResize = (): void => {
      setColumns(stdout?.columns ?? process.stdout.columns);
    };

    stdout?.on('resize', onResize);

    return () => {
      stdout?.off('resize', onResize);
    };
  }, [stdout, setColumns]);

  return columns;
}
