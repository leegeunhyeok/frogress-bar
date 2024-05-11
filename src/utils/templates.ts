import { INTERNAL_PLACEHOLDER_PROGRESS } from '../constants';

type TemplatePlaceholder = `{${string}}`;

type PlainText = string;

interface ColoredText {
  text: PlainText;
  color: string;
}

interface TemplateToken {
  text: PlainText;
  placeholder: string | null;
  color?: string;
}

export type TemplateValues = Record<string, PlainText | ColoredText>;

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
  templateValues: TemplateValues,
): TemplateToken {
  if (token.placeholder === null) return token;

  const templateValue = templateValues[token.placeholder];

  if (templateValue) {
    if (typeof templateValue === 'string') {
      token.text = templateValue;
    } else if (typeof templateValue === 'object') {
      token.text = templateValue.text;
      token.color = templateValue.color;
    }
  }

  return token;
}
