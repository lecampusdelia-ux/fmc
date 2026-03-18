import type { ITheme } from '@xterm/xterm';

const style = getComputedStyle(document.documentElement);
const cssVar = (token: string) => style.getPropertyValue(token) || undefined;

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar('--fmc-elements-terminal-cursorColor'),
    cursorAccent: cssVar('--fmc-elements-terminal-cursorColorAccent'),
    foreground: cssVar('--fmc-elements-terminal-textColor'),
    background: cssVar('--fmc-elements-terminal-backgroundColor'),
    selectionBackground: cssVar('--fmc-elements-terminal-selection-backgroundColor'),
    selectionForeground: cssVar('--fmc-elements-terminal-selection-textColor'),
    selectionInactiveBackground: cssVar('--fmc-elements-terminal-selection-backgroundColorInactive'),

    // ansi escape code colors
    black: cssVar('--fmc-elements-terminal-color-black'),
    red: cssVar('--fmc-elements-terminal-color-red'),
    green: cssVar('--fmc-elements-terminal-color-green'),
    yellow: cssVar('--fmc-elements-terminal-color-yellow'),
    blue: cssVar('--fmc-elements-terminal-color-blue'),
    magenta: cssVar('--fmc-elements-terminal-color-magenta'),
    cyan: cssVar('--fmc-elements-terminal-color-cyan'),
    white: cssVar('--fmc-elements-terminal-color-white'),
    brightBlack: cssVar('--fmc-elements-terminal-color-brightBlack'),
    brightRed: cssVar('--fmc-elements-terminal-color-brightRed'),
    brightGreen: cssVar('--fmc-elements-terminal-color-brightGreen'),
    brightYellow: cssVar('--fmc-elements-terminal-color-brightYellow'),
    brightBlue: cssVar('--fmc-elements-terminal-color-brightBlue'),
    brightMagenta: cssVar('--fmc-elements-terminal-color-brightMagenta'),
    brightCyan: cssVar('--fmc-elements-terminal-color-brightCyan'),
    brightWhite: cssVar('--fmc-elements-terminal-color-brightWhite'),

    ...overrides,
  };
}
