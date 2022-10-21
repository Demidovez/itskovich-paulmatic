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
        <p>
          Введите свое имя, адрес электронной почты, пароль, компанию и
          электронную почту Вашего директора для регистрации
        </p>
        <RegisterForm />
        <p className="text-center mt-3">
          Уже есть аккаунт?
          <span
            className="login-link"
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
