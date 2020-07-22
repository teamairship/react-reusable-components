
import React from 'react';
import ExampleSection from '../_AppInternal/_components/ExampleSection';
import ExampleCode from '../_AppInternal/_components/ExampleCode';


import Button from '../components/bootstrap/Button';
import Form from '../components/formik/Form';
import InputPhone from '../components/formik/InputPhone';
import InputCreditCard from '../components/formik/InputCreditCard';
import InputDate from '../components/formik/InputDate';
import InputNumber from '../components/formik/InputNumber';
import InputPrice from '../components/formik/InputPrice';

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
    </>
  );
};

export default FormsPage;