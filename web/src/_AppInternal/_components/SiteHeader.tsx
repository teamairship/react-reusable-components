
import React from 'react';
import reactLogo from '../_assets/react-logo.svg';
import { useHistory, Link } from 'react-router-dom';

import './SiteHeader.scss';
import Container from './Container';

import Button from '../../components/bootstrap/Button';
import NavDrawer from '../../components/custom/NavDrawer';
import cx from '../../utils/css/composeClassNames';
import NavMenu from '../../components/custom/NavMenu';
import Toggle from '../../components/custom/Toggle';
import getDOMBody from '../../utils/dom/getDOMBody';

const SiteHeaderLeft = () => {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center justify-content-md-between">
      <img src={reactLogo} className="App-logo" alt="airship logo" />
      <h1 className="App-name">
        <Link to="/">
          REACT REUSABLE <br className="d-md-none"/>COMPONENTS
        </Link>
      </h1>
    </div>
  );
};

interface SiteHeaderRightProps {
  toggleNav: () => void,
  isShowingNav?: boolean,
  refNavToggle?: React.Ref<any>,
}
const SiteHeaderRight: React.FC<SiteHeaderRightProps> = ({
  toggleNav,
  isShowingNav,
  refNavToggle,
}) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (isDarkTheme) {
      getDOMBody().classList.add('dark-theme');
    } else {
      getDOMBody().classList.remove('dark-theme');
    }
  }, [isDarkTheme]);
  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <div className="text-center my-4 my-md-0 d-md-flex align-items-center">
      <Toggle
        className="mr-4"
        onClick={handleToggleTheme}
        checked={isDarkTheme}
      />
      <Button
        type="light"
        onClick={() => {
          toggleNav();
        }}
        ref={refNavToggle}
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
  const history = useHistory();
  const refNavToggle = React.useRef(null);
  return (
    <>
      <header className="App-header">
        <Container className="d-block d-md-flex align-items-center justify-content-between">
          <SiteHeaderLeft />
          <SiteHeaderRight toggleNav={toggleNav} isShowingNav={isShowingNav} refNavToggle={refNavToggle} />
        </Container>
      </header>
      <NavDrawer
        isShowing={isShowingNav}
        hideNav={hideNav}
        animationType="slideOver"
      >
        <NavMenu
          hideNav={hideNav}
          history={history}
          refNavToggle={refNavToggle}
        />
      </NavDrawer>
    </>
  );
};

export default SiteHeader;
