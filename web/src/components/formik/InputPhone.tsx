
import React, { useRef } from 'react';
import { useField } from 'formik';
import InputMask from '../../utils/form/InputMask';
import useUuid from '../../hooks/useUuid';
import setCursorPosition from '../../utils/dom/setCursorPosition';

const regexLastNumber = /(\d)(?!.*\d)/i;
const inputMaskPhone = new InputMask({ mask: '[1 ](000) 000-0000' });

interface InputProps {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
}
const InputPhone: React.FC<InputProps> = ({ id, label, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const inputRef = useRef(null);
  const uuid = useUuid(id);

  const onChange = (ev: any) => {
    let isDeleting = false;
    let value = ev.target.value;
    const { selectionStart = 0 } = ev.target;
    // determine if a char was just deleted
    if (
      inputRef.current &&
      inputRef.current._prevValue &&
      inputRef.current._prevValue.length - ev.target.value.length === 1
    ) {
      isDeleting = true;
      const pre = inputRef.current._prevValue.substring(0, selectionStart);
      const post = inputRef.current._prevValue.substring(selectionStart + 1, inputRef.current._prevValue.length);
      value = pre + post;
    }
    const maskedValue = inputMaskPhone.mask(value);
    const rawValue = inputMaskPhone.unmask(value);
    helpers.setTouched(true);
    helpers.setValue(maskedValue);
    if (!inputRef.current) return;
    inputRef.current._prevValue = maskedValue;
    inputRef.current._prevRawValue = rawValue;
    inputRef.current._prevEventValue = value;
    inputRef.current._prevEventValue = value;
    if (isDeleting) {
      const valueBeforeCursor = maskedValue.substring(0, selectionStart);
      const indexLastNumber = valueBeforeCursor.search(regexLastNumber);
      const newCursorPosition = (indexLastNumber > -1 ? indexLastNumber : maskedValue.length) + 1
      setTimeout(() => {
        setCursorPosition(inputRef.current, newCursorPosition);
      }, 0);
    } else {
      const lastTypedChar = value[selectionStart - 1];
      const regexLastTypedChar = new RegExp(lastTypedChar);
      const valueAfterCursor = maskedValue.substring(selectionStart - 1);
      const indexLastTypedChar = valueAfterCursor.search(regexLastTypedChar);
      const newCursorPosition = selectionStart + (indexLastTypedChar > -1 ? indexLastTypedChar : maskedValue.length);
      setTimeout(() => {
        setCursorPosition(inputRef.current, newCursorPosition);
      }, 0);
    }
  };

  return (
    <p style={{ marginTop: 0, marginBottom: 20 }}>
      <label htmlFor={uuid} style={{ display: 'block', marginBottom: 10 }}>
        <p>
          <strong>
            {label}
          </strong>
        </p>
        <input
          {...field}
          id={uuid}
          ref={inputRef}
          onChange={onChange}
          // onKeyUp={onKeyUp}
          placeholder={placeholder || (inputMaskPhone.placeholder)}
          style={{ marginBottom: 10 }}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </p>
  );
};

export default InputPhone;
