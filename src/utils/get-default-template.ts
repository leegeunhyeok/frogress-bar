import {
  INTERNAL_PLACEHOLDER_PERCENT,
  INTERNAL_PLACEHOLDER_PROGRESS,
  INTERNAL_PLACEHOLDER_TOTAL,
  INTERNAL_PLACEHOLDER_VALUE,
} from '../constants';
import type { PlaceholderConfig } from '../types';

interface GetDefaultTemplateConfig {
  progress: string;
  total: number;
  value: number;
}

function getTemplateValue(
  placeholderConfig: PlaceholderConfig,
  text: string,
  placeholderName: string,
): PlaceholderConfig[keyof PlaceholderConfig] {
  const config = placeholderConfig[placeholderName];

  if (config) {
    const color = typeof config === 'object' ? config.color : undefined;

    return color ? { text, color } : text;
  }

  return text;
}

export function getDefaultTemplate(
  { progress, total, value }: GetDefaultTemplateConfig,
  templateValues: PlaceholderConfig,
): PlaceholderConfig {
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
