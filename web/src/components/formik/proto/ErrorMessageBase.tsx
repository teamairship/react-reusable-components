import React from 'react';
import { FieldMetaProps } from 'formik';

type ErrorMessageBase = {
  meta?: FieldMetaProps<any>;
  customMsg?: string;
};
const defaultMeta: FieldMetaProps<any> = {
  value: null,
  initialTouched: false,
  touched: false,
  error: null,
};

export const ErrorMessageBase = ({ meta = defaultMeta, customMsg = '' }) => {
  const derivedErrMsg = typeof meta.error === 'string' ? meta.error : '';
  const msg = customMsg || derivedErrMsg;
  return meta.touched && meta.error ? (
    <span className="error" style={{ color: 'red' }}>
      {msg}
    </span>
  ) : null;
};
