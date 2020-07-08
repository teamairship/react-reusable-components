
import InputMask from '../InputMask';

test('input masks work correctly for phone numbers', () => {
  const i1 = new InputMask({ mask: '[1 ](000) 000-0000' });
  expect(i1.mask('19999999999')).toEqual('1 (999) 999-9999');

  const i2 = new InputMask({ mask: '[1 ](000)-000-0000' });
  expect(i2.mask('7775553333')).toEqual('(777)-555-3333');

  // handle max length
  const i3 = new InputMask({ mask: '[1 ](000)-000-0000', maxLength: 11 });
  expect(i3.mask('7775553333124564654654')).toEqual('(777)-555-3333');

  // handle extra chars
  const i4 = new InputMask({ mask: '[1 ](000)-000-0000' });
  expect(i4.mask('(777) 555-3333')).toEqual('(777)-555-3333');
  expect(i4.mask('(777)-555-3333')).toEqual('(777)-555-3333');
  expect(i4.mask('777 555-3333')).toEqual('(777)-555-3333');

  // handle partials
  const i5 = new InputMask({ mask: '[1 ](000) 000-0000' });
  expect(i5.mask('777')).toEqual('(777');
  expect(i5.mask('7775')).toEqual('(777) 5');
  expect(i5.mask('777555')).toEqual('(777) 555');
  expect(i5.mask('77755560')).toEqual('(777) 555-60');

  // handle guide mode
  const i6 = new InputMask({ mask: '[1 ](000) 000-0000', guide: true });
  expect(i6.mask('777')).toEqual('(777) ___-____');
  expect(i6.mask('7775')).toEqual('(777) 5__-____');
  expect(i6.mask('777555')).toEqual('(777) 555-____');
  expect(i6.mask('77755560')).toEqual('(777) 555-60__');
  expect(i6.mask('777555601')).toEqual('(777) 555-601_');
  expect(i6.mask('7775556010')).toEqual('(777) 555-6010');
  expect(i6.mask('')).toEqual('');

  // handle escaped characters
  const i7 = new InputMask({ mask: '1 (8\\0\\0) 000-0000' });
  expect(i7.mask('1234567')).toEqual('1 (800) 123-4567');
  const i8 = new InputMask({ mask: '\\0\\1\\2\\3 0000 0000 0000' });
  expect(i8.mask('123412341234')).toEqual('0123 1234 1234 1234');

  // handle prefix
  const i9 = new InputMask({ mask: '0000 0000 0000 0000', prefix: "visa " });
  expect(i9.mask('1111222233334444')).toEqual('visa 1111 2222 3333 4444');
  expect(i9.mask('1111')).toEqual('visa 1111');
  expect(i9.mask('')).toEqual('');
});

test('input mask resolve works as expected', () => {
  const i1 = new InputMask({ mask: '[1 ](000) 000-0000' });
  i1.resolve('1-999-999-9999');
  expect(i1.value).toEqual('1 (999) 999-9999');
  expect(i1.unmaskedValue).toEqual('19999999999');
});

test('input masks work correctly for credit cards', () => {
  const inputMaskCC = new InputMask({ mask: '0000 0000 0000 0000', maxLength: 16 });

  expect(inputMaskCC.mask('1234123412341234')).toEqual('1234 1234 1234 1234');
  expect(inputMaskCC.mask('12341234')).toEqual('1234 1234');
});

test('input mask constructed with correct default delimeter', () => {
  const i1 = new InputMask({ mask: Number });
  expect(i1._delimiter).toEqual(',');
  const i2 = new InputMask({ mask: Date });
  expect(i2._delimiter).toEqual('/');
  const i3 = new InputMask({ mask: Number, delimiter: '|' });
  expect(i3._delimiter).toEqual('|');
  const i4 = new InputMask({ mask: "0000 0000" });
  expect(i4._delimiter).toEqual('-');
});

test('input mask works for number type', () => {
  const i1 = new InputMask({ mask: Number });
  expect(i1.mask()).toEqual('');
  expect(i1.mask(0)).toEqual('0');
  expect(i1.mask(1)).toEqual('1');
  expect(i1.mask(15)).toEqual('15');
  expect(i1.mask(150)).toEqual('150');
  expect(i1.mask(1500)).toEqual('1,500');
  expect(i1.mask(15000)).toEqual('15,000');
  expect(i1.mask(15000.1)).toEqual('15,000.1');
  expect(i1.mask(15000.11)).toEqual('15,000.11');
  expect(i1.mask('.')).toEqual('0.');
  expect(i1.mask('15000.')).toEqual('15,000.');
  expect(i1.mask('15000.0')).toEqual('15,000.0');
  expect(i1.mask('15000.00')).toEqual('15,000.00');
  expect(i1.mask('15000000.00')).toEqual('15,000,000.00');

  // handle user input
  const iu = new InputMask({ mask: Number });
  expect(iu.mask('1,1')).toEqual('11');
  expect(iu.mask('11,11')).toEqual('1,111');
  expect(iu.mask('111,11')).toEqual('11,111');
  expect(iu.mask('111,111')).toEqual('111,111');
  expect(iu.mask('1111,111')).toEqual('1,111,111');
  expect(iu.mask('1111,1111')).toEqual('11,111,111');
  expect(iu.mask('1,111,1111')).toEqual('11,111,111');
  expect(iu.mask('1,111,11111')).toEqual('111,111,111');

  // handle different number formats
  const i2 = new InputMask({ mask: Number, delimiter: '.', decimalChar: ',' });
  expect(i2.mask('15000,00')).toEqual('15.000,00');
  expect(i2.mask('150000,00')).toEqual('150.000,00');
  expect(i2.mask('1500000,00')).toEqual('1.500.000,00');

  // handle currency prefix
  const i3 = new InputMask({ mask: Number, prefix: '$' });
  expect(i3.mask('')).toEqual('');
  expect(i3.mask('1')).toEqual('$1');
  expect(i3.mask('11')).toEqual('$11');
  expect(i3.mask('111')).toEqual('$111');
  expect(i3.mask('1111')).toEqual('$1,111');
  expect(i3.mask('11111')).toEqual('$11,111');
  expect(i3.mask('111111')).toEqual('$111,111');
  expect(i3.mask('1111111')).toEqual('$1,111,111');
  expect(i3.mask('15000000.00')).toEqual('$15,000,000.00');

  // handle decimal precision
  const i4 = new InputMask({ mask: Number, prefix: '$', decimalPrecision: 2 });
  expect(i4.mask('')).toEqual('');
  expect(i4.mask('.')).toEqual('$0.');
  expect(i4.mask('0')).toEqual('$0');
  expect(i4.mask('0.')).toEqual('$0.');
  expect(i4.mask('0.0')).toEqual('$0.0');
  expect(i4.mask('0.00')).toEqual('$0.00');
  expect(i4.mask('0.000')).toEqual('$0.00');
  expect(i4.mask('0.1')).toEqual('$0.1');
  expect(i4.mask('0.11')).toEqual('$0.11');
  expect(i4.mask('0.111')).toEqual('$0.11');
  expect(i4.mask('0.114')).toEqual('$0.11');
  expect(i4.mask('0.115')).toEqual('$0.12');
  expect(i4.mask('0.119')).toEqual('$0.12');
  expect(i4.mask('0.121')).toEqual('$0.12');
  expect(i4.mask('0.125')).toEqual('$0.13');
  expect(i4.mask('11.125')).toEqual('$11.13');
  expect(i4.mask('1111111.999')).toEqual('$1,111,111.99');
  expect(i4.mask('1111111.9999')).toEqual('$1,111,111.99');
  expect(i4.mask(1111111.9999)).toEqual('$1,111,111.99');
  const i5 = new InputMask({ mask: Number, decimalPrecision: 4 });
  expect(i5.mask(3.14159265359)).toEqual('3.1416');

  // handle different number format AND decimal precision
  const i6 = new InputMask({ mask: Number, prefix: '£', delimiter: '.', decimalChar: ',', decimalPrecision: 2 });
  expect(i6.mask('')).toEqual('');
  expect(i6.mask('.')).toEqual('');
  expect(i6.mask(',')).toEqual('£0,');
  expect(i6.mask('12345')).toEqual('£12.345');
  expect(i6.mask('12345,678')).toEqual('£12.345,68');
});

test('input mask works for date type', () => {
  const i1 = new InputMask({ mask: Date, datePattern: 'YYYY-mm-dd', delimiter: '-' });
  expect(i1.mask('')).toEqual('');
  expect(i1.mask('2')).toEqual('2');
  expect(i1.mask('20')).toEqual('20');
  expect(i1.mask('200')).toEqual('200');
  expect(i1.mask('2001')).toEqual('2001');
  expect(i1.mask('20010')).toEqual('2001-0');
  expect(i1.mask('200101')).toEqual('2001-01');
  expect(i1.mask('2001010')).toEqual('2001-01-0');
  expect(i1.mask('20010101')).toEqual('2001-01-01');
  expect(i1.mask('20010131')).toEqual('2001-01-31');
  expect(i1.mask('20011231')).toEqual('2001-12-31');
  expect(i1.mask('20201231')).toEqual('2020-12-31');
  expect(i1.mask('2020-12-31')).toEqual('2020-12-31');
  expect(i1.mask('2020/12/31')).toEqual('2020-12-31');
  expect(i1.mask('2020.12.31')).toEqual('2020-12-31');

  // handle mm-yy format
  const i2 = new InputMask({ mask: Date, datePattern: 'mm-yy' });
  expect(i2.mask('021990')).toEqual('02/1990');
  expect(i2.mask('02-1990')).toEqual('02/1990');

  // handle mm-dd-yyyy format
  const i3 = new InputMask({ mask: Date, datePattern: 'mm-dd-yyyy' });
  expect(i3.mask('01012010')).toEqual('01/01/2010');
  expect(i3.mask('12312020')).toEqual('12/31/2020');
  expect(i3.mask('12-31-2020')).toEqual('12/31/2020');

  // handle out-of-bound numbers
  const i4 = new InputMask({ mask: Date, datePattern: 'mm-dd-yyyy' });
  expect(i4.mask('00000000')).toEqual('01/01/0001');
  expect(i4.mask('00330000')).toEqual('01/31/0001');
  expect(i4.mask('99000000')).toEqual('12/01/0001');
  expect(i4.mask('00009999')).toEqual('01/01/9999');

  // handle date bleeding into next month (the logic here is based on Date.prototype.setDate internal functionality and doesn't reflect a particular use-case need)
  expect(i4.mask('02292010')).toEqual('03/01/2010');
  expect(i4.mask('02302010')).toEqual('03/02/2010');
  expect(i4.mask('02312010')).toEqual('03/03/2010');

  // handle date guide mode
  const i5 = new InputMask({ mask: Date, guide: true });
  expect(i5.mask('')).toEqual('____/__/__');
  expect(i5.mask('2')).toEqual('2___/__/__');
  expect(i5.mask('20')).toEqual('20__/__/__');
  expect(i5.mask('200')).toEqual('200_/__/__');
  expect(i5.mask('2000')).toEqual('2000/__/__');
  expect(i5.mask('20001')).toEqual('2000/1_/__');
  expect(i5.mask('200011')).toEqual('2000/11/__');
  expect(i5.mask('2000111')).toEqual('2000/11/1_');
  expect(i5.mask('20001111')).toEqual('2000/11/11');
  expect(i5.mask('20200101')).toEqual('2020/01/01');
});
