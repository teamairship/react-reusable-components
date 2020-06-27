
import React from 'react';
import reactLogo from '../_assets/react-logo.svg';

import './SiteHeader.scss';
import Container from './Container';

import Button from '../../components/bootstrap/Button';
import Modal from '../../components/bootstrap/Modal';
import focusElement from '../../utils/dom/focusElement';

const SiteHeaderLeft = () => {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center justify-content-md-between">
      <img src={reactLogo} className="App-logo" alt="airship logo" />
      <h1 className="App-name">
        <a
          href="/"
        >
          REACT REUSABLE <br className="d-md-none"/>COMPONENTS
        </a>
      </h1>
    </div>
  );
};

interface SiteHeaderRightProps {
  showNavModal: () => void,
}
const SiteHeaderRight: React.FC<SiteHeaderRightProps> = ({ showNavModal }) => {
  return (
    <div className="text-center my-4 my-md-0">
      <Button
        type="light"
        onClick={() => {
          showNavModal();
        }}
      >
        <i className="fas fa-bars" />
      </Button>
    </div>
  );
};

const SiteHeader = () => {
  const [isShowingNavModal, setIsShowingNavModal] = React.useState<boolean>(false);
  const showNavModal = () => { setIsShowingNavModal(true); }
  const hideNavModal = () => { setIsShowingNavModal(false); }
  const r1 = React.useRef(null);
  return (
    <>
      <header className="App-header">
        <Container className="d-block d-md-flex align-items-center justify-content-between">
          <SiteHeaderLeft />
          <SiteHeaderRight showNavModal={showNavModal} />
        </Container>
      </header>
      <Modal
        isShowing={isShowingNavModal}
        closeModal={hideNavModal}
        onAfterShow={() => {
          focusElement(r1.current);
        }}
      >
        Hello world
        <p>
          <input ref={r1} />
        </p>
      </Modal>
    </>
  );
};

export default SiteHeader;
