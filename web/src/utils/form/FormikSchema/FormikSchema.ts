import { FormikErrors, FormikValues } from 'formik';
import pick from 'lodash/pick';
import { InputProps } from '../../../components/formik/Input';
import {
  FormikSchemaConstructorOptions,
  FormikSchemaObject,
  FieldValidator,
  FormikSchemaField,
} from './types';
import { validateAllValues, validateFieldByType } from './validations';

// these are the props that get passed to an <Input> component via formikSchema.getFieldProps
const SCHEMA_FIELD_PROPS = [
  'id',
  'type',
  'name',
  'label',
  'placeholder',
  'required',
  'afterChange',
];

export class FormikSchema {
  _schema: FormikSchemaObject = {};
  _initialValues: { [key: string]: any } = {};
  _validate = () => ({});
  _fieldValidations: FieldValidator[] = [];
  _requiredFields: string[] = [];

  constructor(schema: FormikSchemaConstructorOptions = {}) {
    this._normalizeSchema(schema);
    this._populateInitialValues();
    return this;
  }

  public getFieldProps = (fieldName: string): InputProps => {
    // @ts-ignore
    return pick(this._schema[fieldName], SCHEMA_FIELD_PROPS);
  };

  public getInitialValues = () => {
    return this._initialValues;
  };

  public validate = (values: FormikValues = {}): FormikErrors<any> => {
    return validateAllValues(values, this._schema, this._fieldValidations, this._requiredFields);
  };

  //
  // PRIVATE METHODS BELOW
  //

  private _normalizeSchema = (schema: FormikSchemaConstructorOptions = {}) => {
    this._schema = {};
    this._fieldValidations = [];
    this._requiredFields = [];
    const keys: string[] = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
      const field = schema[keys[i]];
      if (!field) continue;
      this._schema[keys[i]] = {
        ...field,
        name: keys[i],
      };
      // set field validation if present
      if (field.validate) {
        this._fieldValidations.push({
          name: keys[i],
          check: field.validate,
          msgOnFail: field.msgOnFail,
        });
      }
      if (field.required) {
        this._requiredFields.push(keys[i]);
      }
    }
  };

  /**
   * @throws Error
   */
  private _checkFieldInitialValue(key: string, field: FormikSchemaField) {
    if (!field) {
      throw new Error(`FormikSchema requires field "${key}" to be defined`);
    }
    const { type, initialValue } = field;
    if (!type || type === 'text') return;
    if (!initialValue) return;
    const passedCustomValidation = field.validate ? field.validate(initialValue) : true;
    if (!passedCustomValidation) {
      throw new Error(
        `Field ${key}.initialValue (${initialValue}) fails initial validation for \`${key}.validate\``,
      );
    }
    const passedValidation = validateFieldByType(field, initialValue);
    if (!passedValidation) {
      throw new Error(
        `Field ${key}.initialValue (${initialValue}) fails initial validation based on its type (${type})`,
      );
    }
  }

  private _populateInitialValues = () => {
    const keys: string[] = Object.keys(this._schema);
    this._initialValues = {};
    for (let i = 0; i < keys.length; i++) {
      const field = this._schema[keys[i]];
      this._checkFieldInitialValue(keys[i], field);
      this._initialValues[keys[i]] = this._schema[keys[i]].initialValue || '';
    }
  };
}
