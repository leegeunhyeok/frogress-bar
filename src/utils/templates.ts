type TemplatePlaceholder = `{${string}}`;

type PlainText = string;

interface ColoredText {
  text: PlainText;
  color: string;
}

interface TemplateToken {
  text: PlainText;
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
  if (template.includes(toTemplatePlaceholder('progress'))) {
    return;
  }

  throw new Error(`invalid progress bar template: ${template}`);
}

export function parseTemplate(
  template: string,
  templateValues: TemplateValues,
): TemplateToken[] {
  const parsedTokens: TemplateToken[] = template
    .split(/(\{[^\}]+\})/g)
    .map((token) => {
      const placeholderName = getPlaceholderName(token);
      const placeholderValue = placeholderName
        ? templateValues[placeholderName]
        : null;

      if (typeof placeholderValue === 'string') {
        return { text: placeholderValue };
      } else if (placeholderValue != null) {
        return { text: placeholderValue.text, color: placeholderValue.color };
      }
      return { text: token };
    });

  return parsedTokens;
}
