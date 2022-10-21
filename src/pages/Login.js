import LoginForm from "components/LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  return (
    <>
      <div>
        <h2>Авторизация</h2>
        <p>Введите свое адрес электронной почты и пароль для авторизации</p>
        <LoginForm />
        <p className="text-center mt-3">
          Нету аккаунта?
          <span
            className="login-link"
            onClick={() => history.push("/auth/register")}
          >
            Создать
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
