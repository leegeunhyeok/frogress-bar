type TemplatePlaceholder = `{${string}}`;

export type TemplateValues = Record<string, unknown>;

function toTemplatePlaceholder(name: string): TemplatePlaceholder {
  return `{${name}}`;
}

export function assertsIsValidTemplate(template: string): asserts template {
  if (template.includes(toTemplatePlaceholder('progress'))) {
    return;
  }

  throw new Error(`invalid progress bar template: ${template}`);
}

export function applyTemplate(
  template: string,
  templateValues: TemplateValues,
): string {
  return Object.entries(templateValues).reduce(
    (prev, [placeholderName, value]) => {
      return prev.replaceAll(
        toTemplatePlaceholder(placeholderName),
        value as string,
      );
    },
    template,
  );
}
