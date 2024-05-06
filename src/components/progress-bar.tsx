import React, { type ReactNode } from 'react';
import { Text } from 'ink';
import { useMaxWidth } from '../hooks/use-max-width';
import {
  parseTemplate,
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

  const renderProgress = (): ReactNode[] => {
    assertsIsValidTemplate(template);

    // TODO: memoize parsed tokens
    const tokens = parseTemplate(template, {
      ...templateValues,
      progress: getProgressBar(),
    });

    return tokens.map((token, index) => (
      // eslint-disable-next-line react/no-array-index-key -- allow
      <Text key={index} color={token.color}>
        {token.text}
      </Text>
    ));
  };

  return <Text>{...renderProgress()}</Text>;
}
