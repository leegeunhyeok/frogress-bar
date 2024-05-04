export const ANSI_ESCAPE_SEQUENCE = '\x1B';

/**
 * @see https://vt100.net/docs/vt510-rm/DECAWM.html
 */
export const DECAWM_AUTO_WRAP = `${ANSI_ESCAPE_SEQUENCE}[?7h`;
export const DECAWM_NO_AUTO_WRAP = `${ANSI_ESCAPE_SEQUENCE}[?7l`;
