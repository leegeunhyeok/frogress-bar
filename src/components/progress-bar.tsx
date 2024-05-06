import React from 'react';
import { Text } from 'ink';
import { useMaxWidth } from '../hooks/use-max-width';
import {
  applyTemplate,
  assertsIsValidTemplate,
  type TemplateValues,
} from '../utils/templates';
import { DEFAULT_TEMPLATE } from '../constants';

export interface ProgressBarProps {
  value: number;
  total: number;
  activeChar: string;
  inactiveChar: string;
  progressBarSize: number;
  template?: string;
  templateValues?: TemplateValues;
}

export function ProgressBar({
  value,
  total,
  activeChar,
  inactiveChar,
  progressBarSize,
  template = DEFAULT_TEMPLATE,
  templateValues = {},
}: ProgressBarProps): React.JSX.Element {
  const calculatedMaxWidth = useMaxWidth(progressBarSize);
  const ratio = Math.min(value / total, 1);

  const getProgressBar = (): string => {
    const activeWidth = Math.floor(calculatedMaxWidth * ratio);
    const activeBar = activeChar.repeat(activeWidth);
    const inactiveBar = inactiveChar.repeat(calculatedMaxWidth - activeWidth);

    return `${activeBar}${inactiveBar}`;
  };

  const renderProgress = (): string => {
    assertsIsValidTemplate(template);

    return applyTemplate(template, {
      ...templateValues,
      value: Math.floor(value),
      total: Math.floor(total),
      percentage: (ratio * 100).toFixed(2),
      progress: getProgressBar(),
    });
  };

  return <Text>{renderProgress()}</Text>;
}
