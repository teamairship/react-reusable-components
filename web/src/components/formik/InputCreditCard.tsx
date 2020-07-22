
import React, { useRef } from 'react';
import { useField } from 'formik';

import useUuid from '../../hooks/useUuid';
import InputMask, { useInputMaskChangeHandler } from '../../utils/form/InputMask';
import InputBase from './InputBase';

const inputMaskCreditCard = new InputMask({ mask: '0000 0000 0000 0000' });

interface InputProps {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
}
const InputCreditCard: React.FC<InputProps> = ({ id, label, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const inputRef = useRef(null);
  const uuid = useUuid(id);
  const onChange = useInputMaskChangeHandler({
    inputRef,
    inputMask: inputMaskCreditCard,
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
      placeholder={placeholder || (inputMaskCreditCard.placeholder)}
      errorComponent={(
        meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null
      )}
    />
  );
};

export default InputCreditCard;
