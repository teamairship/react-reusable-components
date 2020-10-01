import React, { useRef, useEffect } from 'react';
import setCursorPosition from '../../utils/dom/setCursorPosition';

/**
 * INPUT MASK
 *
 * https://jsperf.com/inputmask-comparison
 *
 * Heavily modelled after imask.js; this aims to be a lean, minimalistic, functional, implementation-agnostic library
 *
 * **USAGE**:
 *
 * ```
 * // phone number mask
 * const inputMaskPhone = new InputMask({ mask: '[1 ](000) 000-0000' });
 * const valFormatted = inputMaskPhone.mask('5409999999') // "(540) 999-9999";
 * const valRaw = inputMaskPhone.unmask('(540) 999-9999') // "5409999999";
 *
 * // credit card number mask
 * const inputMaskCC = new InputMask({ mask: '0000 0000 0000 0000' });
 * const valFormatted = inputMaskCC.mask('1234123412341234') // "1234 1234 1234 1234";
 * const valRaw = inputMaskCC.unmask('1234 1234 1234 1234') // "1234123412341234";
 *
 * // number mask
 * const inputMaskNumber = new InputMask({ mask: Number });
 * const valFormatted = inputMaskNumber.mask('12345.67') // "12,345.67";
 * const valRaw = inputMaskNumber.unmask('12,345.67') // "12345.67";
 *
 * // date mask
 * const inputMaskDate = new InputMask({ mask: Date });
 * const valFormatted = inputMaskDate.mask('20201231') // "2020-12-31";
 * const valRaw = inputMaskDate.unmask('2020-12-31') // "20201231";
 *
 * // alternate mask usage
 * const inputMaskGeneric = new InputMask({ mask: "0000 0000" });
 * inputMaskGeneric.process("12345678");
 * inputMaskGeneric.value; // "1234 5678"
 * inputMaskGeneric.unmaskedValue; // "12345678"
 * ```
 */

const regexNonAlphaNumeric = /[|()[\]/\\\-+_.,\s]/gi;
const regexLastAlphaNumeric = /([0-9a-zA-Z])(?!.*[0-9a-zA-Z])/i;
const regexNotNumeric = /[$|()[\]/\\\-+_\sa-zA-Z]/gi;
const regexDateDelimiter = /[|()[\]/\\\-+_.\sa-zA-Z]/gi;
const regexNumeric = /[0-9]/i;
const regexAlpha = /[a-zA-Z]/i;

const CHAR_DIGIT = '0';
const CHAR_ALPHA = 'a';
const CHAR_ANY = '*';
const CHAR_ESCAPE = '\\';
const DEFAULT_MASK = '';
const DEFAULT_MASK_DELIMITER = '-';
const DEFAULT_MASK_VALUE = '';
const DEFAULT_DECIMAL_CHAR = '.';
const DEFAULT_DECIMAL_PRECISION = Infinity;
const DEFAULT_DATE_PATTERN = 'YYYY-mm-dd';
const DEFAULT_DATE_PATTERN_PARTS = ['yyyy', 'mm', 'dd'];
const DEFAULT_PREFIX = '';
const DEFAULT_PLACEHOLDER = '';

const padWithZeros = (str: any, numFill = 0) => {
  return (str || '').toString().padStart(numFill, '0');
};

type Mask = any;

interface InputMaskConstructorOptions {
  mask: Mask;
  delimiter?: string;
  maxLength?: number;
  guide?: boolean;
  decimalChar?: string;
  datePattern?: string;
  decimalPrecision?: number;
  prefix?: string;
}

interface PatternPart {
  value: string;
  optional: boolean;
  escape: boolean;
}

export default class InputMask {
  _mask: Mask = DEFAULT_MASK;
  _maskParts: any[] = [];
  _maxLength = Infinity;
  _guide = false;
  _delimiter: string = DEFAULT_MASK_DELIMITER;
  _delimiterRegex: RegExp;
  _decimalChar: string = DEFAULT_DECIMAL_CHAR;
  _decimalPrecision: number = DEFAULT_DECIMAL_PRECISION;
  _datePattern: string = DEFAULT_DATE_PATTERN;
  _datePatternParts: string[] = DEFAULT_DATE_PATTERN_PARTS;
  _prefix: string = DEFAULT_PREFIX;
  placeholder: string = DEFAULT_PLACEHOLDER;
  value: string = DEFAULT_MASK_VALUE;
  unmaskedValue: any = DEFAULT_MASK_VALUE;

  constructor(
    options: InputMaskConstructorOptions = {
      mask: DEFAULT_MASK_VALUE,
    },
  ) {
    this._checkOptions(options);
    this._mask = options.mask || DEFAULT_MASK;
    this._maxLength = options.maxLength || Infinity;
    this._guide = options.guide || false;
    this._delimiter = options.delimiter || this._getDefaultDelimiter();
    this._delimiterRegex = new RegExp(`\\${this._delimiter}`, 'g');
    this._decimalChar = options.decimalChar || DEFAULT_DECIMAL_CHAR;
    this._decimalPrecision = options.decimalPrecision || DEFAULT_DECIMAL_PRECISION;
    this._datePattern = options.datePattern || DEFAULT_DATE_PATTERN;
    this._prefix = options.prefix || DEFAULT_PREFIX;
    this._maskParts = InputMask._preparePatternParts(options.mask);
    this._datePatternParts = InputMask._prepareDatePatternParts(this._datePattern);
    this.placeholder = this._getMaskPlaceholder();
    return this;
  }

  _checkOptions(options: InputMaskConstructorOptions) {
    if (!options.mask) {
      throw new Error('constructor `options.mask` param required and cannot be empty');
    }
  }

  static _preparePatternParts(mask: Mask): PatternPart[] {
    if (!mask) return [];
    if (typeof mask !== 'string' && typeof mask !== 'number') return [];
    const _mask = (mask || '').toString();
    const parts: PatternPart[] = [];
    let buffer = '';
    let optionalFlag = false;
    let escapeNextChar = false;
    const addPart = (value: any, optional = false, escape = false) => {
      parts.push({
        value,
        optional,
        escape,
      });
    };
    for (let i = 0; i < _mask.length; i += 1) {
      const char = _mask[i];
      if (escapeNextChar) {
        addPart(char, false, true);
        escapeNextChar = false;
        continue;
      }
      if (char === CHAR_ESCAPE) {
        escapeNextChar = true;
        continue;
      }
      if (char === '[') {
        optionalFlag = true;
        continue;
      }
      if (char === ']') {
        addPart(buffer, true, false);
        optionalFlag = false;
        buffer = '';
        continue;
      }
      if (optionalFlag) {
        buffer += char;
        continue;
      }
      addPart(char, false, false);
    }
    return parts;
  }

  static _prepareDatePatternParts(datePattern = ''): string[] {
    return datePattern
      .split(regexNonAlphaNumeric)
      .filter(v => !!v)
      .map(v => v.toLowerCase());
  }

  _getMaskPlaceholder() {
    let dummyInput = ''.padStart(this._mask.length, '9');
    if (this._isTypeNumber()) {
      dummyInput = '9999.99';
    } else if (this._isTypeDate()) {
      return this._datePatternParts
        .map(part => {
          if (part.includes('y')) return 'YYYY';
          if (part.includes('m')) return 'MM';
          if (part.includes('d')) return 'DD';
          return '';
        })
        .join(this._delimiter);
    }
    return this.mask(dummyInput) || DEFAULT_PLACEHOLDER;
  }

  _isTypeNumber() {
    return (
      false ||
      this._mask === 'Number' ||
      this._mask === 'number' ||
      this._mask === Number ||
      this._mask instanceof Number
    );
  }

  _isTypeDate() {
    return (
      false ||
      this._mask === 'Date' ||
      this._mask === 'date' ||
      this._mask === Date ||
      this._mask instanceof Date
    );
  }

  _getDefaultDelimiter() {
    if (this._isTypeNumber()) {
      return ',';
    }
    if (this._isTypeDate()) {
      return '/';
    }
    return DEFAULT_MASK_DELIMITER;
  }

  _sanitizeInput(val: any): string {
    const formatVal = (regexCharsToStrip: RegExp) => {
      const _val = !val && val !== 0 ? '' : val;
      return _val
        .toString()
        .replace(regexCharsToStrip, '')
        .replace(this._delimiterRegex, '');
    };
    if (this._isTypeNumber()) {
      return formatVal(regexNotNumeric);
    }
    if (this._isTypeDate()) {
      return formatVal(regexDateDelimiter);
    }
    return (val || '').toString().replace(regexNonAlphaNumeric, '');
  }

  _round(num = '') {
    if (num.length <= this._decimalPrecision || !this._decimalPrecision) {
      return num;
    }
    const rounded = ((parseInt(num, 10) || 0) / 10 ** num.length).toFixed(this._decimalPrecision);
    if (rounded[0] === '1') return num.substring(0, this._decimalPrecision);
    return rounded.substring(2);
  }

  _maskNumber(val: any) {
    const _val: string = this._sanitizeInput(val);
    if (!_val.length) return '';

    const isLastCharDecimal = _val[_val.length - 1] === this._decimalChar;
    const [numPartWhole, numPartDecimal] = _val.split(this._decimalChar).slice(0, 2);

    if (!numPartWhole) {
      if (isLastCharDecimal) {
        return this._prefix + '0' + this._decimalChar;
      }
      return '';
    }

    let composed = '';
    let placeValue = 0;
    for (let i = numPartWhole.length - 1; i >= 0; i--) {
      if (placeValue && !(placeValue % 3)) {
        composed = this._delimiter + composed;
      }
      composed = numPartWhole[i] + composed;
      placeValue++;
    }
    const suffix = numPartDecimal
      ? `${this._decimalChar}${this._round(numPartDecimal)}`
      : isLastCharDecimal
      ? this._decimalChar
      : '';
    const prefix = composed ? this._prefix : '';
    return prefix + composed + suffix;
  }

  _maskDate(val: any) {
    const _val: string = this._sanitizeInput(val);
    const datePatternParts = this._datePatternParts;
    const maxCursor = _val.length;
    let composed = '';
    let cursor = 0;
    let currentDay = 0;
    let currentMonth = 0;
    let currentYear = 0;

    const setTimeFromInput = (currentTimeUnit: 'd' | 'm' | 'y', partial: string) => {
      const intPartial = parseInt(partial, 10);
      switch (currentTimeUnit) {
        case 'd':
          currentDay = intPartial;
          break;
        case 'm':
          currentMonth = intPartial;
          break;
        case 'y':
          currentYear = intPartial;
          break;
        default:
          break;
      }
    };

    const captureChars = (currentTimeUnit: 'd' | 'm' | 'y', numChars = 4, max = '9999') => {
      if (cursor !== 0) {
        composed += this._delimiter;
      }
      let partial = _val.substring(cursor, cursor + numChars);
      if (partial.length === numChars) {
        const isUnderMin = parseInt(partial, 10) === 0;
        const isOverMax = parseInt(partial, 10) > parseInt(max, 10);
        if (isUnderMin) {
          partial = '01'.padStart(numChars, '0');
        } else if (isOverMax) {
          partial = max;
        }
        setTimeFromInput(currentTimeUnit, partial);
      } else if (this._guide) {
        partial = partial.padEnd(numChars, '_');
      }
      composed += partial;
      cursor += partial.length;
    };

    for (let i = 0; i < datePatternParts.length; i++) {
      const part = datePatternParts[i];
      if (cursor >= maxCursor) {
        if (!this._guide) break;
        if (cursor !== 0) {
          composed += this._delimiter;
        }
        if (part.includes('y')) {
          composed += '____';
          cursor += 4;
        } else {
          composed += '__';
          cursor += 2;
        }
        continue;
      }
      if (part.includes('y')) {
        captureChars('y', 4, '9999');
        continue;
      }
      if (part.includes('m')) {
        captureChars('m', 2, '12');
        continue;
      }
      if (part.includes('d')) {
        captureChars('d', 2, '31');
        continue;
      }
    }

    if (currentDay && currentMonth && currentYear) {
      const d = new Date();
      d.setFullYear(currentYear);
      d.setMonth(currentMonth - 1);
      d.setDate(currentDay);
      const dateParts = [];
      for (let i = 0; i < datePatternParts.length; i++) {
        const part = datePatternParts[i];
        if (part.includes('y')) {
          dateParts.push(padWithZeros(d.getFullYear(), 4));
          continue;
        }
        if (part.includes('m')) {
          dateParts.push(padWithZeros(d.getMonth() + 1, 2));
          continue;
        }
        if (part.includes('d')) {
          dateParts.push(padWithZeros(d.getDate(), 2));
          continue;
        }
      }
      composed = dateParts.join(this._delimiter);
    }
    return composed;
  }

  mask(val: any) {
    if (this._isTypeNumber()) return this._maskNumber(val);
    if (this._isTypeDate()) return this._maskDate(val);

    const _val: string = this._sanitizeInput(val);
    if (!_val) return '';

    const maxCursor = _val.length;
    let composed = '';
    let cursor = 0;
    const pushChar = (char: string) => {
      composed += char;
      cursor++;
    };
    for (let i = 0; i < this._maskParts.length; i++) {
      if (cursor >= this._maxLength) break;

      const char = _val[cursor];
      const part = this._maskParts[i];
      const compareVal = part.value
        .trim()
        .toLowerCase()
        .replace(regexNonAlphaNumeric, '');

      if (part.escape) {
        composed += part.value;
        continue;
      }

      if (cursor >= maxCursor) {
        if (!this._guide) break;
        if (compareVal === CHAR_DIGIT || compareVal === CHAR_ALPHA || compareVal === CHAR_ANY) {
          pushChar('_');
          continue;
        }
      }

      if (
        (compareVal === CHAR_DIGIT && regexNumeric.test(char)) ||
        (compareVal === CHAR_ALPHA && regexAlpha.test(char)) ||
        compareVal === CHAR_ANY
      ) {
        pushChar(char);
        continue;
      }

      if (part.optional) {
        if (compareVal === char) {
          pushChar(part.value);
        }
        continue;
      }

      composed += part.value;
    }
    const prefix = composed ? this._prefix : '';
    return prefix + composed;
  }

  unmask(val: any) {
    return this._sanitizeInput(val);
  }

  resolve(val: any) {
    this.value = this.mask(val);
    this.unmaskedValue = this.unmask(val);
    return this;
  }
}

interface InputMaskChangeHandlerConstructorOptions {
  inputRef: React.Ref<any>;
  inputMask: InputMask;
  setValue: (value: any) => void;
  setTouched?: (isTouched: boolean) => void;
}
class InputMaskChangeHandler {
  _inputRef: any = null;
  _inputMask: InputMask = null;
  _setValue: (value: any) => void = () => {};
  _setTouched: (isTouched: boolean) => void = () => {};
  _currentValue = '';
  _currentValueRaw = '';
  _currentValueMasked = '';
  _currentValueUnmasked = '';
  _currentCursorPosition = 0;
  _lastValueRaw = '';
  _lastValueMasked = '';
  _lastValueUnmasked = '';
  _lastCursorPosition = 0;
  _lastTypedChar = '';

  constructor(options: InputMaskChangeHandlerConstructorOptions) {
    this._inputRef = options.inputRef;
    this._inputMask = options.inputMask;
    this._setValue = options.setValue;
    this._setTouched = options.setTouched;
  }

  onChange = (ev: any) => {
    if (!this._inputMask) return;
    if (!this._inputRef || !this._inputRef.current) return;
    const { selectionStart: currentCursorPosition = 0, value: currentEventValue = '' } = ev.target;
    let isDeleting = false;
    this._currentValue = currentEventValue;
    this._currentValueRaw = currentEventValue;
    const maskedValue = this._inputMask.mask(this._currentValue);
    const unmaskedValue = this._inputMask.unmask(this._currentValue);
    this._currentValueMasked = maskedValue;
    this._currentValueUnmasked = unmaskedValue;
    this._currentCursorPosition = currentCursorPosition;
    this._lastTypedChar = currentEventValue[currentCursorPosition - 1];
    if (this._checkIsDeleting()) {
      isDeleting = true;
      const pre = this._lastValueMasked.substring(0, currentCursorPosition);
      const post = this._lastValueMasked.substring(
        currentCursorPosition + 1,
        this._lastValueMasked.length,
      );
      this._currentValue = pre + post;
    }
    this._setTouched(true);
    this._setValue(maskedValue);

    if (isDeleting) {
      this._setCursorBackward();
    } else {
      this._setCursorForward();
    }

    this._lastValueMasked = this._currentValueMasked;
    this._lastValueUnmasked = this._currentValueUnmasked;
    this._lastValueRaw = this._currentValueRaw;
    this._lastCursorPosition = this._currentCursorPosition;
  };

  _checkIsDeleting = (): boolean => {
    return this._lastValueMasked.length - this._currentValueRaw.length === 1;
  };

  _setCursorForward = (): void => {
    const cursorPosition = this._getCursorForwardPosition();
    setTimeout(() => {
      setCursorPosition(this._inputRef.current, cursorPosition);
    }, 0);
  };

  _setCursorBackward = (): void => {
    const cursorPosition = this._getCursorBackwardPosition();
    setTimeout(() => {
      setCursorPosition(this._inputRef.current, cursorPosition);
    }, 0);
  };

  _getCursorForwardPosition = (): number => {
    const didAddMaskChars = this._currentValueMasked.length > this._lastValueMasked.length + 1;
    const nextCursorMatchesLastTyped =
      this._lastTypedChar === this._currentValueMasked[this._currentCursorPosition];
    const shouldAddAdditionalCursorOffset = didAddMaskChars && nextCursorMatchesLastTyped;
    const regexLastTypedChar = new RegExp(this._lastTypedChar);
    const valueAfterCursor = this._currentValueMasked.substring(this._currentCursorPosition - 1);
    const indexLastTypedChar = valueAfterCursor.search(regexLastTypedChar);
    const offset = shouldAddAdditionalCursorOffset ? 1 : 0;
    const newPos =
      this._currentCursorPosition +
      (indexLastTypedChar > -1 ? indexLastTypedChar : this._currentValueMasked.length) +
      offset;
    return newPos;
  };

  _getCursorBackwardPosition = (): number => {
    const valueBeforeCursor = this._currentValueMasked.substring(0, this._currentCursorPosition);
    const indexLastNumber = valueBeforeCursor.search(regexLastAlphaNumeric);
    const newPos = (indexLastNumber > -1 ? indexLastNumber : this._currentValueMasked.length) + 1;
    return newPos;
  };
}

export const useInputMaskChangeHandler = (
  options: InputMaskChangeHandlerConstructorOptions,
): React.ChangeEventHandler => {
  const inputMaskChangeHandler = useRef(null);
  const onChange = useRef(() => {});
  useEffect(() => {
    inputMaskChangeHandler.current = new InputMaskChangeHandler(options);
    onChange.current = inputMaskChangeHandler.current.onChange;
    return () => {
      delete inputMaskChangeHandler.current;
    };
  }, []);
  return onChange.current || (() => {});
};
