
import React, { useRef } from 'react';
import { useField } from 'formik';

import useUuid from '../../hooks/useUuid';
import InputMask, { useInputMaskChangeHandler } from '../../utils/form/InputMask';
import InputBase from './InputBase';

const inputMaskPrice = new InputMask({ mask: Number, prefix: '$' });

interface InputProps {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
}
const InputPrice: React.FC<InputProps> = ({ id, label, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const inputRef = useRef(null);
  const uuid = useUuid(id);
  const onChange = useInputMaskChangeHandler({
    inputRef,
    inputMask: inputMaskPrice,
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
      placeholder={placeholder || (inputMaskPrice.placeholder)}
      errorComponent={(
        meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null
      )}
    />
  );
};

export default InputPrice;
