import RegisterForm from "components/RegisterForm/RegisterForm";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Register = () => {
  const history = useHistory();

  return (
    <>
      <div>
        <h2>Регистрация</h2>
        <RegisterForm />
        <p className="text-center mt-3">
          Уже есть аккаунт?
          <span
            className="login-link"
            style={{ color: "#4450ff" }}
            onClick={() => history.push("/auth/login")}
          >
            Авторизация
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
