
import React from 'react';
import InputMask from '../../../utils/form/InputMask';
import { FormikInputBase, FormikInputBaseProps } from './_FormikInputBase';

const inputMaskCreditCard = new InputMask({ mask: '0000 0000 0000 0000' });

const InputCreditCard: React.FC<FormikInputBaseProps> = ({ placeholder, ...props }) => {
  return (
    <FormikInputBase
      {...props}
      inputMask={inputMaskCreditCard}
      placeholder={placeholder || (inputMaskCreditCard.placeholder)}
    />
  );
};

export default InputCreditCard;
