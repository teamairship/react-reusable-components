
// @ts-ignore
import chroma from 'chroma-js';

const transparentize = (color: string, amount = 0) => {
  let boundedAmount = 1 - amount;
  if (boundedAmount > 1) boundedAmount = 1;
  if (boundedAmount < 0) boundedAmount = 0;
  return chroma(color).alpha(boundedAmount).css();
}

export const colors = {
  black: '#000',
  white: '#fff',
  gray: {
    100: '#f7fafc',
    200: '#edf2f7',
    300: '#e2e8f0',
    400: '#cbd5e0',
    500: '#a0aec0',
    600: '#718096',
    700: '#4a5568',
    800: '#2d3748',
    900: '#1a202c',
  },
  red: {
    100: '#fff5f5',
    200: '#fed7d7',
    300: '#feb2b2',
    400: '#fc8181',
    500: '#f56565',
    600: '#e53e3e',
    700: '#c53030',
    800: '#9b2c2c',
    900: '#742a2a',
  },
  orange: {
    100: '#fffaf0',
    200: '#feebc8',
    300: '#fbd38d',
    400: '#f6ad55',
    500: '#ed8936',
    600: '#dd6b20',
    700: '#c05621',
    800: '#9c4221',
    900: '#7b341e',
  },
  yellow: {
    100: '#fffff0',
    200: '#fefcbf',
    300: '#faf089',
    400: '#f6e05e',
    500: '#ecc94b',
    600: '#d69e2e',
    700: '#b7791f',
    800: '#975a16',
    900: '#744210',
  },
  green: {
    100: '#f0fff4',
    200: '#c6f6d5',
    300: '#9ae6b4',
    400: '#68d391',
    500: '#48bb78',
    600: '#38a169',
    700: '#2f855a',
    800: '#276749',
    900: '#22543d',
  },
  teal: {
    100: '#e6fffa',
    200: '#b2f5ea',
    300: '#81e6d9',
    400: '#4fd1c5',
    500: '#38b2ac',
    600: '#319795',
    700: '#2c7a7b',
    800: '#285e61',
    900: '#234e52',
  },
  blue: {
    100: '#ebf8ff',
    200: '#bee3f8',
    300: '#90cdf4',
    400: '#63b3ed',
    500: '#4299e1',
    600: '#3182ce',
    700: '#2b6cb0',
    800: '#2c5282',
    900: '#2a4365',
  },
  indigo: {
    100: '#ebf4ff',
    200: '#c3dafe',
    300: '#a3bffa',
    400: '#7f9cf5',
    500: '#667eea',
    600: '#5a67d8',
    700: '#4c51bf',
    800: '#434190',
    900: '#3c366b',
  },
  purple: {
    100: '#faf5ff',
    200: '#e9d8fd',
    300: '#d6bcfa',
    400: '#b794f4',
    500: '#9f7aea',
    600: '#805ad5',
    700: '#6b46c1',
    800: '#553c9a',
    900: '#44337a',
  },
  pink: {
    100: '#fff5f7',
    200: '#fed7e2',
    300: '#fbb6ce',
    400: '#f687b3',
    500: '#ed64a6',
    600: '#d53f8c',
    700: '#b83280',
    800: '#97266d',
    900: '#702459',
  },
};

const THEME_PRIMARY = 'primary';
const THEME_DARK = 'dark';

export const theme = {
  [THEME_PRIMARY]: {
    colors: {
      main: {
        bg: colors.gray[100],
        text: colors.gray[900],
      },
      header: {
        bg: colors.gray[800],
        text: colors.gray[100],
      },
      footer: {
        bg: colors.gray[200],
        text: colors.gray[800],
      },
      nav: {
        bg: transparentize(colors.gray[200], 0.05),
        text: colors.gray[800],
      },
      accent: 'pink',
    },
  },
  [THEME_DARK]: {
    colors: {
      main: {
        bg: colors.gray[900],
        text: colors.gray[100],
      },
      header: {
        bg: colors.gray[800],
        text: colors.gray[100],
      },
      footer: {
        bg: colors.gray[800],
        text: colors.gray[200],
      },
      nav: {
        bg: transparentize(colors.gray[200], 0.05),
        text: colors.gray[800],
      },
      accent: 'pink',
    },
  },
};

const COLOR_TRANSITION_TIME = '100ms';

function sassColorClass(classPrefix: string = '', name: string, color: string, prop = 'color') {
  const prefix = name ? "theme-" : 'theme';
  return `${classPrefix}.${prefix}${name} { ${prop}: ${color}; transition: ${prop} ${COLOR_TRANSITION_TIME} ease-in-out }`;
}

function sassColorClasses(classPrefix: string = '', name: string = '', color: string = '') {
  if (!name) return '';
  if (/text$/i.test(name)) return sassColorClass(classPrefix, name.replace(/-{0,1}text$/i, ''), color, 'color');
  if (/bg$/i.test(name)) return sassColorClass(classPrefix, name, color, 'background-color');
  if (/border$/i.test(name)) return sassColorClass(classPrefix, name, color, 'border-color');
  return [
    sassColorClass(classPrefix, name.replace(/-{0,1}text$/i, ''), color, 'color'),
    sassColorClass(classPrefix, `${name}-bg`, color, 'background-color'),
    sassColorClass(classPrefix, `${name}-border`, color, 'border-color'),
  ].join('\n');
}

function sassVariable(name: string, value: string) {
  return "$" + name + ": " + value + ";";
}

function mapVariables(vars: any = {}, prefix: string = ''): { key: string, value: string }[] {
  return Object.keys(vars).map((key) => {
    if (typeof vars[key] === 'string') {
      return {
        key: `${prefix}${key}`,
        value: vars[key],
      }
    }
    if (typeof vars[key] === 'object') {
      return mapVariables(vars[key], `${prefix}${key}-`);
    }
    return { key: '', value: '' };
  }).flat().filter(v => v && v.key);
}

function getColorClassPrefix(theme: string) {
  if (!theme) return '';
  switch (theme) {
    case THEME_PRIMARY:
      return 'body ';
    default:
      return `body.${theme}-theme `;
  }
}

function getThemeColorScss(theme: string = '', vars: any = {}): string {
  const pairs = mapVariables(vars);
  const colorClassPrefix = getColorClassPrefix(theme);
  const classes = pairs.map(({ key, value }) => sassColorClasses(colorClassPrefix, key, value)).join('\n');
  return classes;
}

interface ProcessedTheme {
  css: string,
}
function processTheme(): ProcessedTheme {
  const defaultReturn = {
    css: '',
  };
  if (typeof theme !== 'object') return defaultReturn;

  const themeKeys = Object.keys(theme);
  // @ts-ignore
  const css: string = themeKeys.map(themeKey => getThemeColorScss(themeKey, theme[themeKey]?.colors)).join('\n');

  return {
    css,
  };
}

export const processedTheme: ProcessedTheme = processTheme();

function sassImport(path: string) {
  return "@import '" + path + "';";
}