import React from 'react';
import {FormikValues, FormikHelpers} from 'formik';

import FormikSchemaWrapper, { CreateFormikSchema } from "./FormikSchemaWrapper";

// const schema = CreateFormikSchema([
//   {
//     name: 'firstName',
//     type: 'text',
//     onEnterPress: ({ setFieldFocus }) => {
//       setFieldFocus('lastName');
//     }
//   },
//   {
//     name: 'lastName',
//     type: 'text',
//   },
//   {
//     name: 'dateOfBirth',
//     type: 'date',
//     onUpdate: ({ setFieldValue }) => {
//       const yearsDiff = 21;
//       setFieldValue('is21OrOlder', yearsDiff >= 21 ? true : false);
//     }
//   },
//   {
//     name: 'is21OrOlder',
//     type: 'checkbox',
//     onUpdate: ({ setFieldValue }) => {
//       setFieldValue('dateOfBirth', '');
//     }
//   },
//   {
//     name: 'occupation',
//     type: 'select',
//   },
//   {
//     name: 'occupationOther',
//     type: 'text',
//     showIf: ({ values }) => values.occupation === 'other',
//   },
//   {
//     name: 'numYearsEducation',
//     type: 'number',
//   },
//   {
//     name: 'favoriteFood',
//     type: 'radio',
//   },
//   {
//     name: 'hobbies',
//     type: 'multiselect',
//   },
// ]);

const onSubmit = (values: FormikValues, actions?: FormikHelpers<FormikValues>) => {

};

const FormikSchemaExample = () => {
  return (
    <FormikSchemaWrapper onSubmit={onSubmit} schema={{}}>

    </FormikSchemaWrapper>
  );
};

export default FormikSchemaExample;
