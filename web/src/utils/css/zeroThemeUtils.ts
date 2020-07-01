
// @ts-ignore
import chroma from 'chroma-js';

// Array.prototype.flat polyfill - shamelessly borrowed from https://github.com/jonathantneal/array-flat-polyfill/blob/master/src/polyfill-flat.js
if (!Array.prototype.flat) {
	Object.defineProperty(Array.prototype, 'flat', {
		configurable: true,
		value: function flat () {
			var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
			return depth ? Array.prototype.reduce.call(this, function (acc: any, cur) {
				if (Array.isArray(cur)) {
          // @ts-ignore
					acc.push.apply(acc, flat.call(cur, depth - 1));
				} else {
					acc.push(cur);
				}
				return acc;
			}, []) : Array.prototype.slice.call(this);
		},
		writable: true
	});
}

export const transparentize = (color: string, amount = 0) => {
  let boundedAmount = 1 - amount;
  if (boundedAmount > 1) boundedAmount = 1;
  if (boundedAmount < 0) boundedAmount = 0;
  return chroma(color).alpha(boundedAmount).css();
}

export interface ProcessedTheme {
  css: string,
}

interface ProcessThemeOptions {
  primaryThemeKey?: string,
  colorTransitionTime?: number,
  sass?: boolean,
}

export function processTheme(theme: any, options: ProcessThemeOptions = {}): ProcessedTheme {
  const defaultReturn = {
    css: '',
  };
  if (typeof theme !== 'object') return defaultReturn;

  const themeKeys = Object.keys(theme);
  // @ts-ignore
  const css: string = themeKeys.map(themeKey =>
    compileThemeCss(themeKey, theme[themeKey]?.colors, options)
  )
    .join('\n');

  return {
    css,
  };
}

const DEFAULT_COLOR_TRANSITION_TIME = 100;
const DEFAULT_REG_TEXT = /text$/i;
const DEFAULT_REG_TEXT_STRIP = /-{0,1}text$/i;
const DEFAULT_REG_BG = /bg$/i;
const DEFAULT_REG_BORDER = /border$/i;

function generateSassVariable(name: string, value: string) {
  return "$" + name + ": " + value + ";";
}

function generateColorClass(cssPrefix: string = '', name: string, color: string, prop = 'color', options: ProcessThemeOptions = {}) {
  const classPrefix = name ? "theme-" : 'theme';
  const transitionTime = `${(options.colorTransitionTime || DEFAULT_COLOR_TRANSITION_TIME)}ms`;
  return `${cssPrefix}.${classPrefix}${name} { ${prop}: ${color}; transition: ${prop} ${transitionTime} ease-in-out }`;
}

function generateColorClasses(cssPrefix: string = '', name: string = '', color: string = '', options: ProcessThemeOptions = {}): string {
  if (!name) return '';
  if (DEFAULT_REG_TEXT.test(name))   return generateColorClass(cssPrefix, name.replace(DEFAULT_REG_TEXT_STRIP, ''), color, 'color', options);
  if (DEFAULT_REG_BG.test(name))     return generateColorClass(cssPrefix, name, color, 'background-color', options);
  if (DEFAULT_REG_BORDER.test(name)) return generateColorClass(cssPrefix, name, color, 'border-color', options);
  return [
    generateColorClass(cssPrefix, name.replace(DEFAULT_REG_TEXT_STRIP, ''), color, 'color', options),
    generateColorClass(cssPrefix, `${name}-bg`, color, 'background-color', options),
    generateColorClass(cssPrefix, `${name}-border`, color, 'border-color', options),
  ].join('\n');
}

function parseColorMap(vars: any = {}, prefix: string = ''): { key: string, value: string }[] {
  return Object.keys(vars).map((key) => {
    if (typeof vars[key] === 'string') {
      return {
        key: `${prefix}${key}`,
        value: vars[key],
      }
    }
    if (typeof vars[key] === 'object') {
      return parseColorMap(vars[key], `${prefix}${key}-`);
    }
    return { key: '', value: '' };
  }).flat().filter(v => v && v.key);
}

function getColorThemePrefix(theme: string, options: ProcessThemeOptions = {}): string {
  if (!theme) return '';
  if (options.sass) return '  ';
  switch (theme) {
    case (options.primaryThemeKey || 'primary'):
      return 'body ';
    default:
      return `body.${theme}-theme `;
  }
}

function compileThemeCss(theme: string = '', colorMap: any = {}, options: ProcessThemeOptions = {}): string {
  const colorValuePairs = parseColorMap(colorMap);
  const colorThemeCssPrefix = getColorThemePrefix(theme, options);
  const colorClasses: string = colorValuePairs.map(({ key, value }) => generateColorClasses(colorThemeCssPrefix, key, value)).join('\n');
  if (options.sass) {
    let bodySelector = 'body';
    if (theme !== (options.primaryThemeKey || 'primary')) {
      bodySelector = `body.${theme}-theme`;
    }
    return `${bodySelector} {\n${colorClasses}\n}\n`;
  }
  return colorClasses;
}
