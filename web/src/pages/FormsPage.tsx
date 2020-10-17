import React from 'react';
import ExampleSection from '../_AppInternal/_components/ExampleSection';
import ExampleCode from '../_AppInternal/_components/ExampleCode';

import Button from '../components/bootstrap/Button';
import Form from '../components/formik/Form';
import InputPhone from '../components/formik/proto/InputPhone';
import InputCreditCard from '../components/formik/proto/InputCreditCard';
import InputDate from '../components/formik/proto/InputDate';
import InputNumber from '../components/formik/proto/InputNumber';
import InputPrice from '../components/formik/proto/InputPrice';
import Input from '../components/formik/Input';
import { FormikSchema } from 'utils/form/FormikSchema/FormikSchema';
import InputText from 'components/formik/proto/InputText';
import { FormikErrors } from 'formik';

const FormsPage = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const initialValuesForm1 = {
    firstname: '',
    phone: '',
    creditCard: '',
    dateOfBirth: '',
    aLargeNumber: '',
    price: '',
  };
  const initialValuesForm2 = {
    dateOfHire: '',
    numCoconuts: '',
    price: '',
  };
  // goal: auto validation based on input type
  // type: number - validate that it is a proper number
  // type: credit card - validate that it has 16 digits and is only numbers
  // type: date - validate that it matches date pattern

  const schema = new FormikSchema({
    firstName: {
      label: 'First Name',
      type: 'text',
      required: true,
      // TODO: add onEnterPress handler
      // onEnterPress: ({ setFieldFocus }) => {
      //   setFieldFocus('lastName');
      // }
    },
    lastName: {
      label: 'Last Name (not "Jones")',
      type: 'text',
      initialValue: 'Townsend',
      msgOnFail: 'Name cannot be "Jones"',
      validate: value => !/^jones$/i.test(value),
      required: true,
    },
    dateOfBirth: {
      label: 'DOB',
      type: 'date',
      required: true,
      afterChange: (value, { setFieldValue }) => {
        const yearsDiff = 21;
        setFieldValue('is21OrOlder', yearsDiff >= 21 ? true : false);
      },
    },
    is21OrOlder: {
      label: 'Are you 21 or older?',
      type: 'text',
    },
    // TODO: add checkbox input type
    // is21OrOlder: {
    //   type: 'checkbox',
    //   afterChange: ({ setFieldValue }) => {
    //     setFieldValue('dateOfBirth', '');
    //   },
    //   initialValue: false,
    // },
    // TODO: add select input type
    // occupation: {
    //   type: 'select',
    // },
    // TODO: add `showIf` functionality
    // occupationOther: {
    //   type: 'text',
    //   showIf: ({ values }) => values.occupation === 'other',
    // },
    numYearsEducation: {
      label: 'Years of Education',
      type: 'number',
      placeholder: '0',
    },
    // favoriteFood: {
    //   type: 'radio',
    // },
    // hobbies: {
    //   type: 'multiselect',
    // },
  });

  console.log({ initialValues: schema.getInitialValues() });

  return (
    <>
      <h2 className="mb-4">Forms &amp; Inputs</h2>

      <ExampleSection title="Formik form with input masking">
        <ExampleCode>
          <Form onSubmit={onSubmit} initialValues={initialValuesForm1}>
            <InputText name="firstName" label="First Name:" />
            <InputPhone name="phone" label="Phone:" />
            <InputCreditCard name="creditCard" label="Credit Card:" />
            <InputDate name="dateOfBirth" label="DOB:" />
            <InputNumber name="aLargeNumber" label="A large number:" />
            <InputPrice name="price" label="Price:" />
            <Button type="dark" submit>
              Submit
            </Button>
          </Form>
        </ExampleCode>
      </ExampleSection>

      <ExampleSection title="Formik form with input masking using a single Input component">
        <ExampleCode>
          <Form onSubmit={onSubmit} initialValues={initialValuesForm2}>
            <Input type="text" name="testtest" label="Test" />
            <Input type="date" name="dateOfHire" label="Date hired:" />
            <Input type="number" name="numCoconuts" label="Number of coconuts you can carry:" />
            <Input type="price" name="price" label="Price of milk:" />
            <Button type="dark" submit>
              Submit
            </Button>
          </Form>
        </ExampleCode>
      </ExampleSection>

      <ExampleSection title="Formik form with pre-defined schema">
        <ExampleCode>
          <Form
            onSubmit={onSubmit}
            initialValues={schema.getInitialValues()}
            validate={schema.validate}
            validateOnBlur
          >
            <Input {...schema.getFieldProps('firstName')} />
            <Input {...schema.getFieldProps('lastName')} />
            <Input {...schema.getFieldProps('dateOfBirth')} />
            <Input {...schema.getFieldProps('is21OrOlder')} />
            <Input {...schema.getFieldProps('numYearsEducation')} />
            <Button type="dark" submit>
              Submit
            </Button>
          </Form>
        </ExampleCode>
      </ExampleSection>
    </>
  );
};

export default FormsPage;
