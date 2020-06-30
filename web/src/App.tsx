import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import './App.scss';
import './styles/tailwind.css';

import SiteHeader from './_AppInternal/_components/SiteHeader';
import routes from './routes';
import Container from './_AppInternal/_components/Container';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column justify-content-between">
        <SiteHeader />
        <div className="App-main theme-main theme-main-bg flex-grow-1 pt-4">
          <Container>
            <div className="App-content-body">
              {routes.map((route, index) => route.component ? (
                <Route key={index} path={route.path} exact component={route.component} />
              ) : null)}
            </div>
          </Container>
        </div>
        <footer className="App-footer theme-footer theme-footer-bg pt-3">
          <Container>
            <p>
              (c) Airship LLC
            </p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
