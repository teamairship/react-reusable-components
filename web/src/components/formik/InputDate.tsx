
import React, { useRef } from 'react';
import { useField } from 'formik';

import useUuid from '../../hooks/useUuid';
import InputMask, { useInputMaskChangeHandler } from '../../utils/form/InputMask';
import InputBase from './InputBase';

const inputMaskDate = new InputMask({ mask: Date, datePattern: 'yyyy/mm/dd', delimiter: '-' });

interface InputProps {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
}
const InputDate: React.FC<InputProps> = ({ id, label, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const inputRef = useRef(null);
  const uuid = useUuid(id);
  const onChange = useInputMaskChangeHandler({
    inputRef,
    inputMask: inputMaskDate,
    setValue: helpers.setValue,
    setTouched: helpers.setTouched,
  });

  return (
    <InputBase
      {...field}
      id={uuid}
      ref={inputRef}
      label={label}
      onChange={onChange}
      placeholder={placeholder || (inputMaskDate.placeholder)}
      errorComponent={(
        meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null
      )}
    />
  );
};

export default InputDate;
