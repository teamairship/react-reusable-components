import { InputType } from 'components/formik/Input';
import { FormikErrors, FormikValues } from 'formik';
import { DEFAULT_DATE_PATTERN } from '../InputMask';
import { FieldValidator, FormikSchemaField, FormikSchemaObject } from './types';

function validatePresent(value: any) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== undefined && value !== null && value !== '';
}

function validateTypeNumber(value: string): boolean {
  if (!value) return true;
  const parsedNum = parseFloat((value ?? '').toString());
  return parsedNum && !isNaN(parsedNum) ? true : false;
}

function validateTypeDate(value: string, dateFormat = DEFAULT_DATE_PATTERN) {
  if (!value) return true;
  // TODO: add date validation
  return true;
}

function validateTypeCreditCard(value: string) {
  if (!value) return true;
  return value.length === 16;
}

function validateTypePhone(value: string) {
  if (!value) return true;
  // TODO: add phone validation
  return true;
}

function validateTypePrice(value: string) {
  if (!value) return true;
  return validateTypeNumber(value);
}

export function validateAllValues(
  values: FormikValues,
  schema: FormikSchemaObject,
  fieldValidations: FieldValidator[] = [],
  requiredFields: string[] = [],
) {
  const errors: FormikErrors<any> = {};
  for (let i = 0; i < fieldValidations.length; i++) {
    const { check, msgOnFail, name } = fieldValidations[i];
    if (!check(values[name])) {
      if (typeof msgOnFail === 'string') {
        errors[name] = msgOnFail.toString();
      } else if (typeof msgOnFail === 'function') {
        errors[name] = msgOnFail(values[name]);
      } else {
        errors[name] = `${name} is not valid`;
      }
    }
    if (!validateFieldByType(schema[name], values[name])) {
      errors[name] = getFieldErrorMsgByType(schema[name].type);
    }
  }

  for (let i = 0; i < requiredFields.length; i++) {
    if (!validatePresent(values[requiredFields[i]])) {
      errors[requiredFields[i]] = 'Required';
    }
  }

  return errors;
}

export function validateFieldByType(field: FormikSchemaField, value: any): boolean {
  if (!field) return;
  const { type } = field;
  if (!type) return;
  switch (type) {
    case 'number':
      return validateTypeNumber(value);
    case 'date':
      if (field.dateFormat) return validateTypeDate(value, field.dateFormat);
      return validateTypeDate(value);
    case 'creditCard':
      return validateTypeCreditCard(value);
    case 'phone':
      return validateTypePhone(value);
    case 'price':
      return validateTypePrice(value);
    default:
      return true;
  }
}

function getFieldErrorMsgByType(type: InputType): string {
  if (!type) return 'Input is not valid';
  switch (type) {
    case 'number':
      return 'Please enter a valid number';
    case 'date':
      return 'Please enter a valid date';
    case 'creditCard':
      return 'Please enter a valid CC';
    case 'phone':
      return 'Please enter a valid phone number';
    case 'price':
      return 'Please enter a valid price';
    default:
      return 'Input is not valid';
  }
}
