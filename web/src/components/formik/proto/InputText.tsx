
import React from 'react';
import { FormikInputBase, FormikInputBaseProps } from './_FormikInputBase';

const InputText: React.FC<FormikInputBaseProps> = ({ ...props }) => {
  return (
    <FormikInputBase
      {...props}
    />
  );
};

export default InputText;
