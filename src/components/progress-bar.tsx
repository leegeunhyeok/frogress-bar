import React from 'react';
import { Text } from 'ink';
import { DEFAULT_ACTIVE_CHAR, DEFAULT_INACTIVE_CHAR } from '../constants';
import { useMaxWidth } from '../hooks/use-max-width';
import type { ProgressValue } from '../types';

export interface ProgressBarProps {
  /**
   * Progress value (Range: `0` to `1`)
   */
  value: ProgressValue;
  activeChar: string;
  inactiveChar: string;
  progressBarSize: number;
}

export function ProgressBar({
  value,
  activeChar = DEFAULT_ACTIVE_CHAR,
  inactiveChar = DEFAULT_INACTIVE_CHAR,
  progressBarSize = 30,
}: ProgressBarProps): React.JSX.Element {
  const calculatedMaxWidth = useMaxWidth(progressBarSize);

  const getProgressText = (): string => {
    const activeWidth = Math.floor(calculatedMaxWidth * value);
    const activeBar = activeChar.repeat(activeWidth);
    const inactiveBar = inactiveChar.repeat(calculatedMaxWidth - activeWidth);

    return `${activeBar}${inactiveBar}`;
  };

  return <Text>{getProgressText()}</Text>;
}
