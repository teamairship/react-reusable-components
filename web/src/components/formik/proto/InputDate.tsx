
import React from 'react';
import InputMask from '../../../utils/form/InputMask';
import { FormikInputBase, FormikInputBaseProps } from './_FormikInputBase';

const inputMaskDate = new InputMask({ mask: Date, datePattern: 'yyyy/mm/dd', delimiter: '-' });

const InputDate: React.FC<FormikInputBaseProps> = ({ placeholder, ...props }) => {
  return (
    <FormikInputBase
      {...props}
      inputMask={inputMaskDate}
      placeholder={placeholder || (inputMaskDate.placeholder)}
    />
  );
};

export default InputDate;
