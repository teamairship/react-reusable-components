import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import SiteHeader from './_AppInternal/_components/SiteHeader';
import routes from './routes';
import Container from './_AppInternal/_components/Container';
import { processedTheme } from './css/zero.theme';
import injectDOMStyle from './utils/dom/injectDOMStyle';


function App() {

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      injectDOMStyle(processedTheme.css);
    }
  }, []);

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
