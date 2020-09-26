import React from 'react';
import InputText from "./proto/InputText";
import InputDate from './proto/InputDate';
import InputNumber from "./proto/InputNumber";
import InputCreditCard from "./proto/InputCreditCard";
import InputPhone from "./proto/InputPhone";
import InputPrice from "./proto/InputPrice";
import { FormikInputBaseProps } from "./proto/_FormikInputBase";

enum InputTypeEnum {
  text,
  date,
  number,
  creditCard,
  phone,
  price,
  __fallback__,
}
type InputType = keyof typeof InputTypeEnum;
type ValidInputComponent = React.FC<any>;

const inputComponentMap: {
  [key in InputType]?: ValidInputComponent;
} = {
  text: InputText,
  date: InputDate,
  number: InputNumber,
  creditCard: InputCreditCard,
  phone: InputPhone,
  price: InputPrice,
  __fallback__: InputText,
};
type InputProps = Omit<FormikInputBaseProps, 'inputMask'> & {
  type: InputType,
};

/**
 * Generic input component
 * ONE INPUT TO RULE THEM ALL
 *
 * **USAGE**
 * ```
 * <Input type="text" name="firstName" />
 * <Input type="number" name="weightInPounds" />
 * <Input type="number" name="age" />
 * <Input type="date" name="age" />
 * ```
 */

const Input: React.FC<InputProps> = ({ type, ...props }) => {
  const InputComponent = inputComponentMap[type] || inputComponentMap.__fallback__;
  return <InputComponent {...props} />
};

export default Input;
