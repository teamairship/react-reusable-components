
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
const regexNotNumeric = /[|()[\]/\\\-+_\sa-zA-Z]/gi;
const regexDateDelimiter = /[|()[\]/\\\-+_.\sa-zA-Z]/gi;
const regexNumeric = /[0-9]/i;
const regexAlpha = /[a-zA-Z]/i;

const CHAR_DIGIT = "0";
const CHAR_ALPHA = "a";
const CHAR_ANY = "*";
const CHAR_ESCAPE = "\\";
const DEFAULT_MASK = "";
const DEFAULT_MASK_DELIMITER = "-";
const DEFAULT_MASK_VALUE = "";
const DEFAULT_DECIMAL_CHAR = ".";
const DEFAULT_DECIMAL_PRECISION = Infinity;
const DEFAULT_DATE_PATTERN = "YYYY-mm-dd";
const DEFAULT_DATE_PATTERN_PARTS = ["yyyy", "mm", "dd"];
const DEFAULT_PREFIX = "";
const DEFAULT_PLACEHOLDER = "";

const padWithZeros = (str: any, numFill = 0) => {
  return (str || "")
    .toString()
    .padStart(numFill, "0");
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

class InputMask {
  _mask: Mask = DEFAULT_MASK;
  _maskParts: any[] = [];
  _maxLength: number = Infinity;
  _guide: boolean = false;
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
    }
  ) {
    this._checkOptions(options);
    this._mask = options.mask || DEFAULT_MASK;
    this._maxLength = options.maxLength || Infinity;
    this._guide = options.guide || false;
    this._delimiter = options.delimiter || this._getDefaultDelimiter();
    this._delimiterRegex = new RegExp(`\\${this._delimiter}`, "g");
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
      throw new Error(
        "constructor `options.mask` param required and cannot be empty"
      );
    }
  }

  static _preparePatternParts(mask: Mask): PatternPart[] {
    if (!mask) return [];
    if (typeof mask !== "string" && typeof mask !== "number") return [];
    const _mask = (mask || "").toString();
    let parts: PatternPart[] = [];
    let buffer = "";
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
      if (char === "[") {
        optionalFlag = true;
        continue;
      }
      if (char === "]") {
        addPart(buffer, true, false);
        optionalFlag = false;
        buffer = "";
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

  static _prepareDatePatternParts(datePattern: string = ""): string[] {
    return datePattern
      .split(regexNonAlphaNumeric)
      .filter(v => !!v)
      .map(v => v.toLowerCase());
  }

  _getMaskPlaceholder() {
    let dummyInput = "".padStart(this._mask.length, "9");
    if (this._isTypeNumber()) {
      dummyInput = "9999.99";
    } else if (this._isTypeDate()) {
      return this._datePatternParts.map(part => {
        if (part.includes("y")) return "YYYY";
        if (part.includes("m")) return "MM";
        if (part.includes("d")) return "DD";
        return "";
      }).join(this._delimiter);
    }
    return this.mask(dummyInput) || DEFAULT_PLACEHOLDER;
  }

  _isTypeNumber() {
    return false ||
      this._mask === "Number" ||
      this._mask === "number" ||
      this._mask === Number ||
      this._mask instanceof Number;
  }

  _isTypeDate() {
    return false ||
      this._mask === "Date" ||
      this._mask === "date" ||
      this._mask === Date ||
      this._mask instanceof Date;
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
      const _val = (!val && val !== 0) ? "" : val;
      return _val.toString()
        .replace(regexCharsToStrip, "")
        .replace(this._delimiterRegex, "");
    };
    if (this._isTypeNumber()) {
      return formatVal(regexNotNumeric);
    }
    if (this._isTypeDate()) {
      return formatVal(regexDateDelimiter);
    }
    return (val || "").toString().replace(regexNonAlphaNumeric, "");
  }

  _round(num: string = "") {
    if (num.length <= this._decimalPrecision || !this._decimalPrecision){
      return num;
    }
    const rounded = ((parseInt(num, 10) || 0) / 10 ** num.length)
      .toFixed(this._decimalPrecision);
    if (rounded[0] === "1") return num.substring(0, this._decimalPrecision);
    return rounded.substring(2);
  }

  _maskNumber(val: any) {
    const _val: string = this._sanitizeInput(val);
    if (!_val.length) return "";

    const isLastCharDecimal = _val[_val.length - 1] === this._decimalChar;
    const [numPartWhole, numPartDecimal] = _val.split(this._decimalChar).slice(0, 2);

    if (!numPartWhole) {
      if (isLastCharDecimal) {
        return this._prefix + "0" + this._decimalChar;
      }
      return "";
    };

    let composed = "";
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
      : (isLastCharDecimal ? this._decimalChar : "");
    const prefix = composed ? this._prefix : "";
    return prefix + composed + suffix;
  }

  _maskDate(val: any) {
    const _val: string = this._sanitizeInput(val);
    const datePatternParts = this._datePatternParts;
    const maxCursor = _val.length;
    let composed = "";
    let cursor = 0;
    let currentDay: number = 0;
    let currentMonth: number = 0;
    let currentYear: number = 0;

    const setTimeFromInput = (currentTimeUnit: "d" | "m" | "y", partial: string) => {
      const intPartial = parseInt(partial, 10);
      switch (currentTimeUnit) {
        case "d":
          currentDay = intPartial;
          break;
        case "m":
          currentMonth = intPartial;
          break;
        case "y":
          currentYear = intPartial;
          break;
        default:
          break;
      }
    };

    const captureChars = (currentTimeUnit: "d" | "m" | "y", numChars = 4, max = '9999') => {
      if (cursor !== 0) {
        composed += this._delimiter;
      }
      let partial = _val.substring(cursor, cursor + numChars);
      if (partial.length === numChars) {
        const isUnderMin = parseInt(partial, 10) === 0;
        const isOverMax = parseInt(partial, 10) > parseInt(max, 10);
        if (isUnderMin) {
          partial = "01".padStart(numChars, "0");
        } else if (isOverMax) {
          partial = max;
        }
        setTimeFromInput(currentTimeUnit, partial);
      } else if (this._guide) {
        partial = partial.padEnd(numChars, "_");
      }
      composed += partial
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
          composed += "____";
          cursor += 4;
        } else {
          composed += "__";
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
    if (!_val) return "";

    const maxCursor = _val.length;
    let composed = "";
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
        .replace(regexNonAlphaNumeric, "");

      if (part.escape) {
        composed += part.value;
        continue;
      }

      if (cursor >= maxCursor) {
        if (!this._guide) break;
        if (
          compareVal === CHAR_DIGIT ||
          compareVal === CHAR_ALPHA ||
          compareVal === CHAR_ANY
        ) {
          pushChar("_");
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
    const prefix = composed ? this._prefix : "";
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

export default InputMask;
