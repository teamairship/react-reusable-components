
import React from 'react';
import reactLogo from '../_assets/react-logo.svg';

import './SiteHeader.scss';
import Container from './Container';

import Button from '../../components/bootstrap/Button';
import Modal from '../../components/bootstrap/Modal';
import focusElement from '../../utils/dom/focusElement';
import NavDrawer from '../../components/custom/NavDrawer';
import cx from '../../utils/css/composeClassNames';

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
  toggleNav: () => void,
  isShowingNav?: boolean,
}
const SiteHeaderRight: React.FC<SiteHeaderRightProps> = ({ toggleNav, isShowingNav }) => {
  return (
    <div className="text-center my-4 my-md-0">
      <Button
        type="light"
        onClick={() => {
          toggleNav();
        }}
      >
        <i className={cx("fas fa-bars", { "fa-rotate-90": isShowingNav })} />
      </Button>
    </div>
  );
};

const SiteHeader = () => {
  const [isShowingNav, setIsShowingNav] = React.useState<boolean>(false);
  const hideNav = () => { setIsShowingNav(false); }
  const toggleNav = () => { setIsShowingNav(!isShowingNav); }
  const r1 = React.useRef(null);
  return (
    <>
      <header className="App-header">
        <Container className="d-block d-md-flex align-items-center justify-content-between">
          <SiteHeaderLeft />
          <SiteHeaderRight toggleNav={toggleNav} isShowingNav={isShowingNav} />
        </Container>
      </header>
      <NavDrawer
        isShowing={isShowingNav}
        hideNav={hideNav}
        animationType="slide"
      >
        [links will go here]
      </NavDrawer>
      {/* <Modal
        isShowing={isShowingNav}
        closeModal={hideNav}
        onAfterShow={() => {
          focusElement(r1.current);
        }}
      >
        Hello world
        <p>
          <input ref={r1} />
        </p>
      </Modal> */}
    </>
  );
};

export default SiteHeader;
