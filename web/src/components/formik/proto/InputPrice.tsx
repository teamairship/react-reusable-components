
import React from 'react';
import InputMask from '../../../utils/form/InputMask';
import { FormikInputBase, FormikInputBaseProps } from './_FormikInputBase';

const inputMaskPrice = new InputMask({ mask: Number, prefix: '$' });

const InputPrice: React.FC<FormikInputBaseProps> = ({ placeholder, ...props }) => {
  return (
    <FormikInputBase
      {...props}
      inputMask={inputMaskPrice}
      placeholder={placeholder || (inputMaskPrice.placeholder)}
    />
  );
};

export default InputPrice;
