import {
  INTERNAL_PLACEHOLDER_PERCENT,
  INTERNAL_PLACEHOLDER_PROGRESS,
  INTERNAL_PLACEHOLDER_TOTAL,
  INTERNAL_PLACEHOLDER_VALUE,
} from '../constants/index.js';
import type { Placeholder } from '../types.js';
import { isColorOnly, toColored, getColor } from './colors.js';

interface GetDefaultTemplateConfig {
  progress: string;
  total: number;
  value: number;
}

function getTemplateValue(
  placeholder: Placeholder,
  text: string,
  placeholderName: string,
): Placeholder[keyof Placeholder] {
  const value = placeholder[placeholderName];
  const color = value ? getColor(value) : null;

  if (value && color) {
    if (isColorOnly(value)) {
      return toColored(text, color);
    }

    throw new Error(
      [
        `Unable to change reserved placeholder text (${placeholderName}).`,
        '',
        `use \`color('${color}')\` instead of \`color(text, '${color}')\`.`,
      ].join('\n'),
    );
  }

  return text;
}

export function getDefaultTemplate(
  { progress, total, value }: GetDefaultTemplateConfig,
  templateValues: Placeholder,
): Placeholder {
  return {
    [INTERNAL_PLACEHOLDER_PROGRESS]: getTemplateValue(
      templateValues,
      progress,
      INTERNAL_PLACEHOLDER_PROGRESS,
    ),
    [INTERNAL_PLACEHOLDER_TOTAL]: getTemplateValue(
      templateValues,
      Math.floor(total).toString(),
      INTERNAL_PLACEHOLDER_TOTAL,
    ),
    [INTERNAL_PLACEHOLDER_VALUE]: getTemplateValue(
      templateValues,
      Math.floor(value).toString(),
      INTERNAL_PLACEHOLDER_VALUE,
    ),
    [INTERNAL_PLACEHOLDER_PERCENT]: getTemplateValue(
      templateValues,
      `${((value / total) * 100).toFixed(2)}%`,
      INTERNAL_PLACEHOLDER_PERCENT,
    ),
  };
}
