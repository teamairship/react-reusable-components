import React from 'react';

import Form, { FormProps } from '../../../components/formik/Form';

export type FormikSchema = object;

export const CreateFormikSchema = (arr: any[]) => arr;

type Children = React.ReactChild | React.ReactChild[];

const injectChildrenWithSchema = (children: Children, schema: FormikSchema) => {
  console.log(children);
  return children;
}

const parseInitialValuesFromSchema = (schema: FormikSchema) => {
  return {};
};

type Props = Omit<FormProps, 'initialValues'> & {
  schema: FormikSchema;
};

const FormikSchemaWrapper: React.FC<Props> = ({
  schema,
  children,
  onSubmit,
}) => {
  const initialValues = React.useRef(parseInitialValuesFromSchema(schema));
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {injectChildrenWithSchema(children, schema)}
    </Form>
  );
};

export default FormikSchemaWrapper;
