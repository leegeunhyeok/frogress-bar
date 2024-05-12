import React, { useMemo } from 'react';
import { Text } from 'ink';
import { useMaxWidth } from '../hooks/use-max-width';
import {
  parseTemplate,
  assertsIsValidTemplate,
  applyPlaceholder,
  type PlaceholderConfig,
} from '../utils/templates';
import { getDefaultTemplate } from '../utils/get-default-template';
import { DEFAULT_TEMPLATE } from '../constants';

export interface ProgressBarProps {
  value: number;
  total: number;
  activeChar: string;
  inactiveChar: string;
  progressBarSize: number;
  template?: string;
  placeholderConfig?: PlaceholderConfig;
}

export function ProgressBar({
  value,
  total,
  activeChar,
  inactiveChar,
  progressBarSize,
  template = DEFAULT_TEMPLATE,
  placeholderConfig = {},
}: ProgressBarProps): React.JSX.Element {
  const calculatedMaxWidth = useMaxWidth(progressBarSize);
  const ratio = Math.min(value / total, 1);

  const templateTokens = useMemo(() => {
    assertsIsValidTemplate(template);
    return parseTemplate(template);
  }, [template]);

  const getProgressBar = (): string => {
    const activeWidth = Math.floor(calculatedMaxWidth * ratio);
    const activeBar = activeChar.repeat(activeWidth);
    const inactiveBar = inactiveChar.repeat(calculatedMaxWidth - activeWidth);

    return `${activeBar}${inactiveBar}`;
  };

  const renderProgress = (): React.JSX.Element[] => {
    const mergedPlaceholderConfig = {
      ...placeholderConfig,
      ...getDefaultTemplate(
        { progress: getProgressBar(), total, value },
        placeholderConfig,
      ),
    };

    return templateTokens.map((token, index) => {
      const { text, color } = applyPlaceholder(token, mergedPlaceholderConfig);

      return (
        // eslint-disable-next-line react/no-array-index-key -- allow
        <Text key={index} color={color}>
          {text}
        </Text>
      );
    });
  };

  return <Text wrap="truncate">{renderProgress()}</Text>;
}
