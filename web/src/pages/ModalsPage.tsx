
import React from 'react';

import Button from '../components/bootstrap/Button';
import focusElement from '../utils/dom/focusElement';

import ModalBootstrap from '../components/bootstrap/Modal';

const ModalPage = () => {
  const [isBootstrapModalShowing, setIsBootstrapModalShowing] = React.useState(false);
  const refBootstrapModalInput = React.useRef(null);
  return (
    <>
      <h2 className="mb-4">Modal Component Examples</h2>
      <h3 className="mb-4">Bootstrap Modal</h3>
      <Button
        type="dark"
        onClick={() => { setIsBootstrapModalShowing(!isBootstrapModalShowing); }}
      >
        Open Bootstrap Modal
      </Button>
      <ModalBootstrap
        title="Bootstrappy!!"
        isShowing={isBootstrapModalShowing}
        closeModal={() => { setIsBootstrapModalShowing(false); }}
        onAfterShow={() => {
          focusElement(refBootstrapModalInput.current);
        }}
      >
        <p>
          Hello world
        </p>
        <p>
          <input ref={refBootstrapModalInput} />
        </p>
      </ModalBootstrap>
    </>
  );
};

export default ModalPage;
