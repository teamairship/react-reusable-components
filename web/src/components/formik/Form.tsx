import React from 'react';
import { Form as FormikForm, Formik, FormikValues, FormikConfig } from 'formik';

export type FormProps = FormikConfig<FormikValues>;

const Form: React.FC<FormProps> = ({ children, initialValues, onSubmit, ...props }) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} {...props}>
      {formikProps => (
        <form
          // @ts-ignore - TS complains because onReset is defined in FormProps
          onReset={formikProps.handleReset}
          onSubmit={formikProps.handleSubmit}
          {...props}
        >
          {children}
        </form>
      )}
    </Formik>
  );
};

export default Form;
