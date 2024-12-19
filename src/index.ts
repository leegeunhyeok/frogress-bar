import { initialize } from './manager';

const manager = initialize();

export const { create, remove, removeAll, count, setOptions } = manager;
export { toColored as color } from './utils/colors';
export type * from './progress-bar';
export type * from './types';
