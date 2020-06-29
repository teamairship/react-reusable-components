
import React from 'react';
import ExampleSection from '../_AppInternal/_components/ExampleSection';
import ExampleCode from '../_AppInternal/_components/ExampleCode';
import LinkableTitle from '../_AppInternal/_components/LinkableTitle';

import Button from '../components/bootstrap/Button';
import Toggle from '../components/custom/Toggle';

const InteractablesPage = () => {
  const [isBootstrapModalShowing, setIsBootstrapModalShowing] = React.useState(false);
  const refBootstrapModalInput = React.useRef(null);
  return (
    <>
      <h1 className="mb-4">Interactable Components</h1>

      <LinkableTitle h2 className="mt-5 mb-4">
        Buttons
      </LinkableTitle>

      <ExampleSection title="Bootstrap Button">
        <ExampleCode>
          <Button
            type="dark"
            onClick={() => { console.log('I am a bootstrapped button!') }}
          >
            Bootstrap Button
          </Button>
        </ExampleCode>
        <ExampleCode>
          <Button
            type="primary"
            onClick={() => { console.log('I am a bootstrapped button!') }}
          >
            Click me!
          </Button>
        </ExampleCode>
        <ExampleCode>
          <Button
            type="warning"
            onClick={() => { console.log('I am a bootstrapped button!') }}
          >
            Something important
          </Button>
        </ExampleCode>
      </ExampleSection>

      <LinkableTitle h2 className="mt-5 mb-4">
        Other UI
      </LinkableTitle>

      <ExampleSection title="Toggle">
        <ExampleCode>
          <Toggle />
        </ExampleCode>
      </ExampleSection>
    </>
  );
};

export default InteractablesPage;
