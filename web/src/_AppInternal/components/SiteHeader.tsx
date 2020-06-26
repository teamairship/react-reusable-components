
import React from 'react';
import reactLogo from '../assets/react-logo.svg';
import airshipLogo from '../assets/airship-logo.svg';

import './SiteHeader.scss';
import Container from './Container';

import NavMenuToggle from '../../components/navigation/NavMenuToggle';

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

const SiteHeaderRight = () => {
  return (
    <div>
      <NavMenuToggle
        type="light"
        onClick={() => {
          console.log('open nav');
        }}
      />
    </div>
  );
};

const SiteHeader = () => {
  return (
    <header className="App-header">
      <Container className="d-block d-md-flex align-items-center justify-content-between">
        <SiteHeaderLeft />
        <SiteHeaderRight />
      </Container>
    </header>
  );
};

export default SiteHeader;
