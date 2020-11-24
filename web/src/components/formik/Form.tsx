import React from 'react';
import { Form as FormikForm, Formik, FormikValues, FormikConfig } from 'formik';

export type FormProps = FormikConfig<FormikValues>;

const Form: React.FC<FormProps> = ({ children, initialValues, onSubmit, ...props }) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} {...props}>
      <FormikForm>{children}</FormikForm>
    </Formik>
  );
};

export default Form;
