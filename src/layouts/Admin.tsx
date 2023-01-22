import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CommonThings from '~src/components/CommonThings/CommonThings';
import Menu from '~src/components/Menu/Menu';
import ModalEmailSettings from '~src/components/ModalEmailSettings/ModalEmailSettings';
import ModalTariff from '~src/components/ModalTariff/ModalTariff';
import { ROUTES } from '~src/routes';
import { saveAccount, setIsNeedSetEmailServer, setShowTariffModal } from '~src/store/slices/commonSlice';
import { getpath } from '~src/utils/utils';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ isSuccess, setIsSuccess ] = useState(false);
  const isNeedSetEmailServer = useSelector(
    (state) => state.common.isNeedSetEmailServer,
  );
  const showedMessageTariffModal = useSelector(
    (state) => state.common.showedMessageTariffModal,
  );

  // const fetchCommon = useFetchCommon();
  // const fetchNotifications = useFetchNotifications();
  // const fetchStatistics = useFetchStatistics();

  useLayoutEffect(() => {
    const Account = JSON.parse(localStorage.getItem('Account')) || {};

    if (Account.sessionToken) {
      dispatch(saveAccount(Account));
      Account.InMailSettings === null &&
        dispatch(setIsNeedSetEmailServer(true));
      // fetchCommon();
      // fetchNotifications();
      // fetchStatistics();
      setIsSuccess(true);
    } else {
      history.push('/auth/login');
    }
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + getpath(prop.path)}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const onCloseModalEmailSettings = () => {
    dispatch(setIsNeedSetEmailServer(false));
  };

  const onCloseTariffModal = () => {
    dispatch(setShowTariffModal(''));
  };

  return (
    <>
      <Menu
        {...props}
        routes={Object.values(ROUTES)}
        logo={{
          innerLink: '/admin' + getpath(ROUTES.index.path),
          imgSrc: require('../assets/img/icons/common/enterprise_white.svg')
            .default,
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Switch>
          {getRoutes(Object.values(ROUTES))}
          <Redirect from="*" to={'/admin' + getpath(ROUTES.index.path)} />
        </Switch>
      </div>
      <ToastContainer
        theme="colored"
        position="bottom-right"
        hideProgressBar
        autoClose={15000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      {isSuccess && <CommonThings />}
      {isNeedSetEmailServer && (
        <ModalEmailSettings onClose={onCloseModalEmailSettings} />
      )}
      {showedMessageTariffModal && (
        <ModalTariff
          onClose={onCloseTariffModal}
          description={showedMessageTariffModal}
        />
      )}
    </>
  );
};

export default Admin;
