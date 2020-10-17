import React, { useEffect, useRef } from 'react';
import { FieldConfig, FormikContextType, useField, useFormikContext } from 'formik';

import { InputBase } from './_InputBase';
import { ErrorMessageBase } from './ErrorMessageBase';
import InputMask, { useInputMaskChangeHandler } from '../../../utils/form/InputMask';

export type FormikInputBaseProps = FieldConfig & {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  inputMask?: InputMask;
  inputRef?: React.RefObject<any>;
  afterChange?: (value: any, form: FormikContextType<any>) => void;
};

export const FormikInputBase: React.FC<FormikInputBaseProps> = ({
  id,
  name,
  label,
  placeholder,
  required,
  inputMask,
  inputRef,
  afterChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const internalInputRef = useRef(null);
  const isInitialized = useRef(false);

  const form = useFormikContext(); // values, submitForm, etc.
  useEffect(() => {
    if (afterChange && isInitialized.current) {
      afterChange(field.value, form);
    }
    isInitialized.current = true;
  }, [field.value]);

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
      id={id}
      name={name}
      inputRef={inputRef || internalInputRef}
      label={label}
      onChange={onChange || field.onChange}
      placeholder={placeholder || null}
      required={required}
      errorComponent={<ErrorMessageBase meta={meta} />}
      hasError={!!(meta.touched && meta.error)}
    />
  );
};
