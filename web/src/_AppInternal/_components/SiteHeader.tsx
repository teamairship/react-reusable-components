
import React from 'react';
import reactLogo from '../_assets/react-logo.svg';

import './SiteHeader.scss';
import Container from './Container';

import NavMenuToggle from '../../components/navigation/NavMenuToggle';
import ModalBootstrap from '../../components/modal/ModalBootstrap';

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
    <div>
      <NavMenuToggle
        type="light"
        onClick={() => {
          showNavModal();
        }}
      />
    </div>
  );
};

const SiteHeader = () => {
  const [isShowingNavModal, setIsShowingNavModal] = React.useState<boolean>(false);
  const showNavModal = () => { setIsShowingNavModal(true); }
  const hideNavModal = () => { setIsShowingNavModal(false); }
  return (
    <>
      <header className="App-header">
        <Container className="d-block d-md-flex align-items-center justify-content-between">
          <SiteHeaderLeft />
          <SiteHeaderRight showNavModal={showNavModal} />
        </Container>
      </header>
      <ModalBootstrap isShowing={isShowingNavModal} closeModal={hideNavModal} >
        Hello world
      </ModalBootstrap>
    </>
  );
};

export default SiteHeader;
