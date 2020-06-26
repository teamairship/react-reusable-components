

export type ClassName = string | object | undefined;

function normalizeClassName (className: ClassName) {
  if (!className) return '';
  if (typeof className === 'string') return className.trim();
  if (typeof className === 'object') {
    return Object.entries(className)
      .map(([key, value]) => value ? key.toString() : '')
      .filter(v => v)
      .join(' ');
  }
}

/**
 * Compose class names
 *
 * **USAGE:**
 *
 * ```
 * import cx from '<PATH_TO>/composeClassNames.ts';
 *
 * // compose multiple css classes together
 * <div className={cx('a', 'b', 'c')} /> // <div class="a b c"></div>
 *
 * // conditionally apply css classes
 * <div className={cx({ a: true, b: false, c: true })} /> // <div class="a c"></div>
 * ```
 */
export default function composeClassNames (...classNames: ClassName[]) {
  if (!classNames || !classNames.length) return '';
  return classNames
    .map(className => normalizeClassName(className))
    .filter(v => v)
    .join(' ');
};
