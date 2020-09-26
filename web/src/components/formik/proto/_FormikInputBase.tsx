
import React, { useRef } from 'react';
import { FieldConfig, useField } from 'formik';

import useUuid from '../../../hooks/useUuid';
import { InputBase } from './_InputBase';
import { ErrorMessageBase } from './ErrorMessageBase';
import InputMask, { useInputMaskChangeHandler } from '../../../utils/form/InputMask';

export type FormikInputBaseProps = FieldConfig & {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
  inputMask?: InputMask;
  inputRef?: React.Ref<any>;
}

export const FormikInputBase: React.FC<FormikInputBaseProps> = ({ id, label, placeholder, inputMask, inputRef, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const internalInputRef = useRef(null);
  const uuid = useUuid(id);
  const onChange = useInputMaskChangeHandler({
    inputRef: inputRef || internalInputRef,
    inputMask,
    setValue: helpers.setValue,
    setTouched: helpers.setTouched,
    onChangeFallback: field.onChange,
  });

  return (
    <InputBase
      {...field}
      id={uuid}
      ref={inputRef || internalInputRef}
      label={label}
      onChange={onChange || field.onChange}
      placeholder={placeholder || null}
      errorComponent={<ErrorMessageBase meta={meta} />}
    />
  );
};
