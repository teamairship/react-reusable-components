import InputMask from '../InputMask';
import { InputType } from '../../../components/formik/Input';
import { FormikContextType } from 'formik';

export type FormikSchemaField = {
  type: InputType;
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  initialValue?: any;
  inputMask?: InputMask;
  inputRef?: React.Ref<any>;
  dateFormat?: string;
  validate?: (value: any) => boolean;
  msgOnFail?: string | ((value: any) => string);
  afterChange?: (value: any, form: FormikContextType<any>) => void;
};

export type FormikSchemaConstructorOptions = {
  [key: string]: Omit<FormikSchemaField, 'name'>;
};

export type FormikSchemaObject = {
  [key: string]: FormikSchemaField;
};

export type FieldValidator = {
  name: string;
  check: (value: any) => boolean;
  msgOnFail: string | ((value: any) => string);
};
