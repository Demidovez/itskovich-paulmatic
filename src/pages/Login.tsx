import { useNavigate } from 'react-router-dom';

import LoginForm from '~src/components/LoginForm/LoginForm';

const Login = () => {
  const navigate = useNavigate();

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
            style={{ color: '#4450ff' }}
            onClick={() => navigate('/auth/register')}
          >
            Создать
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
