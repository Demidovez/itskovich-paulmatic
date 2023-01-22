import React, { useEffect } from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import AuthFooter from '~src/components/Footers/AuthFooter.js';
import AuthNavbar from '~src/components/Navbars/AuthNavbar.js';
import { ROUTES } from '~src/routes';

import './Auth.scss';

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem('Account');
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });

  return (
    <div className="auth-component main-content" ref={mainContent}>
      <div className="content d-flex">
        <div className="form">
          <div className="form-wrapper">
            <Switch>
              {getRoutes(Object.values(ROUTES))}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </div>
        </div>
        <div className="image p-3">
          <div className="image-wrapper">
            <a href="https://palmautic.ru" target="_blank">
              <img
                src={
                  require('../../assets/img/icons/common/logo_for_auth.svg')
                    .default
                }
                style={{
                  width: 300,
                }}
              />
            </a>
          </div>
        </div>
      </div>
      <div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default Auth;
