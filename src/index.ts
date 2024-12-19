import { initialize } from './manager.js';

const manager = initialize();

export const { create, remove, removeAll, setOptions } = manager;
export { toColored as color } from './utils/colors.js';
export type * from './progress-bar.js';
export type * from './types.js';
