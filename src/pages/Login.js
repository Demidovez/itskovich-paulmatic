import LoginForm from "components/LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  return (
    <>
      <div>
        <h2>Вход</h2>
        {/* <p>Введите свой адрес электронной почты и пароль для авторизации</p> */}
        <LoginForm />
        <p className="text-center mt-3">
          У Вас нет аккаунта?
          <span
            className="login-link"
            style={{ color: "#4450ff" }}
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
