import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "routes.js";
import Menu from "components/Menu/Menu";
import CommonThings from "components/CommonThings/CommonThings";
import { useDispatch } from "react-redux";
import { saveAccount } from "store/slices/commonSlice";
import useFetchCommon from "hooks/useFetchCommon";
import useFetchNotifications from "hooks/useFetchNotifications";
import useFetchStatistics from "hooks/useFetchStatistics";
import ModalEmailSettings from "components/ModalEmailSettings/ModalEmailSettings";
import { useSelector } from "react-redux";
import { setInMailSettingsStatus } from "store/slices/commonSlice";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const mailSettingsStatus = useSelector(
    (state) => state.common.Account.InMailSettings
  );

  // const fetchCommon = useFetchCommon();
  // const fetchNotifications = useFetchNotifications();
  // const fetchStatistics = useFetchStatistics();

  useLayoutEffect(() => {
    const Account = JSON.parse(localStorage.getItem("Account")) || {};

    if (Account.sessionToken) {
      dispatch(saveAccount(Account));
      // fetchCommon();
      // fetchNotifications();
      // fetchStatistics();
      setIsSuccess(true);
    } else {
      history.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
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
  };

  const onCloseModalEmailSettings = () =>
    dispatch(setInMailSettingsStatus("saved"));

  return (
    <>
      <Menu
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/logo.svg").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
      <ToastContainer
        theme="colored"
        position="bottom-right"
        hideProgressBar
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      {isSuccess && <CommonThings />}
      {mailSettingsStatus !== "saved" && (
        <ModalEmailSettings
          onClose={onCloseModalEmailSettings}
          status={mailSettingsStatus}
        />
      )}
    </>
  );
};

export default Admin;
