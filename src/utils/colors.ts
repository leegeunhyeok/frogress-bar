import { COLOR, COLOR_ONLY } from '../types.js';

export function toColored(color: string): string;
export function toColored(text: string, color: string): string;
export function toColored(arg0: string, arg1?: unknown): string {
  return typeof arg1 === 'undefined'
    ? Object.assign('', { [COLOR]: arg0, [COLOR_ONLY]: true })
    : Object.assign(arg0, { [COLOR]: arg1 });
}

export function getColor(value: string): string | undefined {
  return Object.getOwnPropertyDescriptor(value, COLOR)?.value as string;
}

export function isColorOnly(value: string): boolean {
  return Boolean(Object.getOwnPropertyDescriptor(value, COLOR_ONLY)?.value);
}
