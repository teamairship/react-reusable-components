
import React from 'react';
import InputMask from '../../../utils/form/InputMask';
import { FormikInputBase, FormikInputBaseProps } from './_FormikInputBase';

const inputMaskPhone = new InputMask({ mask: '[1 ](000) 000-0000' });

const InputPhone: React.FC<FormikInputBaseProps> = ({ placeholder, ...props }) => {
  return (
    <FormikInputBase
      {...props}
      inputMask={inputMaskPhone}
      placeholder={placeholder || (inputMaskPhone.placeholder)}
    />
  );
};

export default InputPhone;
