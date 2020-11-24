
import React from 'react';
import InputMask from '../../../utils/form/InputMask';
import { FormikInputBase, FormikInputBaseProps } from './_FormikInputBase';

const inputMaskNumber = new InputMask({ mask: Number });

interface InputProps {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
}
const InputNumber: React.FC<FormikInputBaseProps> = ({ placeholder, ...props }) => {
  return (
    <FormikInputBase
      {...props}
      inputMask={inputMaskNumber}
      placeholder={placeholder || (inputMaskNumber.placeholder)}
    />
  );
};

export default InputNumber;
