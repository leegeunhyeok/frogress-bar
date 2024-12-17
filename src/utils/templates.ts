import { INTERNAL_PLACEHOLDER_PROGRESS } from '../constants';
import type { Placeholder } from '../types';
import { getColor } from './colors';

type TemplatePlaceholder = `{${string}}`;

interface TemplateToken {
  text: string;
  placeholder: string | null;
  color?: string;
}

function toTemplatePlaceholder(name: string): TemplatePlaceholder {
  return `{${name}}`;
}

function getPlaceholderName(text: string): string | null {
  return /^\{.*\}$/.test(text) ? text.substring(1, text.length - 1) : null;
}

export function assertsIsValidTemplate(template: string): asserts template {
  if (template.includes(toTemplatePlaceholder(INTERNAL_PLACEHOLDER_PROGRESS))) {
    return;
  }

  throw new Error(`invalid progress bar template: ${template}`);
}

export function parseTemplate(template: string): TemplateToken[] {
  const parsedTokens: TemplateToken[] = template
    .split(/(\{[^}]+\})/g)
    .map((value) => ({
      text: value,
      placeholder: getPlaceholderName(value),
    }));

  return parsedTokens;
}

export function applyPlaceholder(
  token: TemplateToken,
  placeholder: Placeholder,
): TemplateToken {
  if (token.placeholder === null) return token;

  const value = placeholder[token.placeholder];

  // console.log({token, placeholder});

  if (value) {
    token.text = value;
    token.color = getColor(value);
  }

  return token;
}
