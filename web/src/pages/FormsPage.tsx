
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

const FormsPage = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  }
  const initialValues = {
    phone: "",
  };
  return (
    <>
      <h2 className="mb-4">Forms &amp; Inputs</h2>

      <ExampleSection title="Formik form with input masking">
        <ExampleCode>
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <InputPhone name="phone" label="Phone:" />
            <InputCreditCard name="creditCard" label="Credit Card:" />
            <InputDate name="dateOfBirth" label="DOB:" />
            <InputNumber name="aLargeNumber" label="A large number:" />
            <InputPrice name="price" label="Price:" />
            <Button
              type="dark"
              submit
            >
              Submit
            </Button>
          </Form>
        </ExampleCode>
      </ExampleSection>

      <ExampleSection title="Formik form with input masking using a single Input component">
        <ExampleCode>
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <Input type="date" name="dateOfHire" label="Date hired:" />
            <Input type="number" name="numCoconuts" label="Number of coconuts you can carry:" />
            <Input type="price" name="price" label="Price of milk:" />
            <Button
              type="dark"
              submit
            >
              Submit
            </Button>
          </Form>
        </ExampleCode>
      </ExampleSection>
    </>
  );
};

export default FormsPage;
