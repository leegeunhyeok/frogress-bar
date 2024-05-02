import React from 'react';
import { Text } from 'ink';
import { DEFAULT_ACTIVE_CHAR, DEFAULT_INACTIVE_CHAR } from '../constants';
import { useMaxWidth } from '../hooks/use-max-width';
import type { ProgressValue } from '../types';

interface ProgressBarProps {
  /**
   * Progress value (0 to 1)
   */
  value: ProgressValue;
  /**
   * Defaults to '█'
   */
  activeChar?: string;
  /**
   * Defaults to '░'
   */
  inactiveChar?: string;
  /**
   * Depend on terminal size
   */
  maxWidth?: number;
}

export function ProgressBar({
  value,
  activeChar = DEFAULT_ACTIVE_CHAR,
  inactiveChar = DEFAULT_INACTIVE_CHAR,
  maxWidth = 30,
}: ProgressBarProps): React.JSX.Element {
  const calculatedMaxWidth = useMaxWidth(maxWidth);

  const getProgressText = (): string => {
    const activeWidth = Math.floor(calculatedMaxWidth * value);
    const activeBar = activeChar.repeat(activeWidth);
    const inactiveBar = inactiveChar.repeat(calculatedMaxWidth - activeWidth);

    return `${activeBar}${inactiveBar}`;
  };

  return <Text>{getProgressText()}</Text>;
}
