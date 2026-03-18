import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'fmc';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  accent: {
    50: '#F0FDF4', // Light green
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#009E49', // FMC Green
    600: '#008F41',
    700: '#007A38',
    800: '#00662F',
    900: '#005226',
    950: '#003D1D',
  },
  fmcRed: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF3340', // FMC Red
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
  fmcYellow: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#FFCD00', // FMC Yellow
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  safelist: [...Object.keys(customIconCollection[collectionName] || {}).map((x) => `i-fmc:${x}`)],
  shortcuts: {
    'fmc-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 fmc-ease-cubic-bezier',
    kdb: 'bg-fmc-elements-code-background text-fmc-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      fmc: {
        elements: {
          borderColor: 'var(--fmc-elements-borderColor)',
          borderColorActive: 'var(--fmc-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--fmc-elements-bg-depth-1)',
              2: 'var(--fmc-elements-bg-depth-2)',
              3: 'var(--fmc-elements-bg-depth-3)',
              4: 'var(--fmc-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--fmc-elements-textPrimary)',
          textSecondary: 'var(--fmc-elements-textSecondary)',
          textTertiary: 'var(--fmc-elements-textTertiary)',
          code: {
            background: 'var(--fmc-elements-code-background)',
            text: 'var(--fmc-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--fmc-elements-button-primary-background)',
              backgroundHover: 'var(--fmc-elements-button-primary-backgroundHover)',
              text: 'var(--fmc-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--fmc-elements-button-secondary-background)',
              backgroundHover: 'var(--fmc-elements-button-secondary-backgroundHover)',
              text: 'var(--fmc-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--fmc-elements-button-danger-background)',
              backgroundHover: 'var(--fmc-elements-button-danger-backgroundHover)',
              text: 'var(--fmc-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--fmc-elements-item-contentDefault)',
            contentActive: 'var(--fmc-elements-item-contentActive)',
            contentAccent: 'var(--fmc-elements-item-contentAccent)',
            contentDanger: 'var(--fmc-elements-item-contentDanger)',
            backgroundDefault: 'var(--fmc-elements-item-backgroundDefault)',
            backgroundActive: 'var(--fmc-elements-item-backgroundActive)',
            backgroundAccent: 'var(--fmc-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--fmc-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--fmc-elements-actions-background)',
            code: {
              background: 'var(--fmc-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--fmc-elements-artifacts-background)',
            backgroundHover: 'var(--fmc-elements-artifacts-backgroundHover)',
            borderColor: 'var(--fmc-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--fmc-elements-artifacts-inlineCode-background)',
              text: 'var(--fmc-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--fmc-elements-messages-background)',
            linkColor: 'var(--fmc-elements-messages-linkColor)',
            code: {
              background: 'var(--fmc-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--fmc-elements-messages-inlineCode-background)',
              text: 'var(--fmc-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--fmc-elements-icon-success)',
            error: 'var(--fmc-elements-icon-error)',
            primary: 'var(--fmc-elements-icon-primary)',
            secondary: 'var(--fmc-elements-icon-secondary)',
            tertiary: 'var(--fmc-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--fmc-elements-preview-addressBar-background)',
              backgroundHover: 'var(--fmc-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--fmc-elements-preview-addressBar-backgroundActive)',
              text: 'var(--fmc-elements-preview-addressBar-text)',
              textActive: 'var(--fmc-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--fmc-elements-terminals-background)',
            buttonBackground: 'var(--fmc-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--fmc-elements-dividerColor)',
          loader: {
            background: 'var(--fmc-elements-loader-background)',
            progress: 'var(--fmc-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--fmc-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--fmc-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--fmc-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--fmc-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--fmc-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--fmc-elements-cta-background)',
            text: 'var(--fmc-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
      unit: 'em',
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
