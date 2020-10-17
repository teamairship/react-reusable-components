// import React from 'react';
// import { FormikValues, FormikHelpers } from 'formik';

// import FormikSchemaWrapper, { CreateFormikSchema } from './FormikSchemaWrapper';

// const schema = CreateFormikSchema({
//   firstName: {
//     type: 'text',
//     onEnterPress: ({ setFieldFocus }) => {
//       setFieldFocus('lastName');
//     }
//   },
//   lastName: {
//     type: 'text',
//     initialValue: 'Townsend',
//     validate: (value) => value !== 'Jones'
//   },
//   dateOfBirth: {
//     type: 'date',
//     onUpdate: ({ setFieldValue }) => {
//       const yearsDiff = 21;
//       setFieldValue('is21OrOlder', yearsDiff >= 21 ? true : false);
//     }
//   },
//   is21OrOlder: {
//     type: 'checkbox',
//     onUpdate: ({ setFieldValue }) => {
//       setFieldValue('dateOfBirth', '');
//     },
//     initialValue: false,
//   },
//   occupation: {
//     type: 'select',
//   },
//   occupationOther: {
//     type: 'text',
//     showIf: ({ values }) => values.occupation === 'other',
//   },
//   numYearsEducation: {
//     type: 'number',
//   },
//   favoriteFood: {
//     type: 'radio',
//   },
//   hobbies: {
//     type: 'multiselect',
//   },
// });

// const onSubmit = (values: FormikValues, actions?: FormikHelpers<FormikValues>) => {};

// const FormikSchemaExample = () => {
//   return <FormikSchemaWrapper onSubmit={onSubmit} schema={{}}></FormikSchemaWrapper>;
// };

// export default FormikSchemaExample;
export default {};
