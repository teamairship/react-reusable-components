
import React from 'react';
import {Form as FormikForm, Formik, FormikValues, FormikHelpers} from 'formik';

export type FormProps = {
  children: React.ReactChild | React.ReactChild[];
  initialValues: FormikValues;
  onSubmit: (values: FormikValues, formikBag?: FormikHelpers<FormikValues>) => void;
};

const Form: React.FC<FormProps> = ({ children, initialValues, onSubmit, ...props }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      {...props}
    >
      <FormikForm>
        {children}
      </FormikForm>
    </Formik>
  );
};

export default Form;
