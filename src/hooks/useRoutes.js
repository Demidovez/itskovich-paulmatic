import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "routes";

const useRoutes = () => {
  const [routes, setRoutes] = useState(ROUTES);
  const [emailUser, setEmailUser] = useState("");
  const username = useSelector((state) => state.common.Account.username);

  useEffect(() => {
    const username = (JSON.parse(localStorage.getItem("Account")) || {})
      .username;

    if (username) {
      setEmailUser(username);
    }
  }, []);

  useEffect(() => {
    if (username) {
      setEmailUser(username);
    }
  }, [username]);

  useEffect(() => {
    console.log(Object.entries(ROUTES));
    emailUser &&
      setRoutes(
        Object.fromEntries(
          Object.entries(ROUTES).map(([key, value]) => [
            key,
            { ...value, path: "/" + emailUser + value.path },
          ])
        )
      );
  }, [emailUser]);

  return routes;
};

export default useRoutes;
