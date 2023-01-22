import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

import RegisterForm from '~src/components/RegisterForm/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>Регистрация</h2>
        <RegisterForm />
        <p className="text-center mt-3">
          Уже есть аккаунт?
          <span
            className="login-link"
            style={{ color: '#4450ff' }}
            onClick={() => navigate('/auth/login')}
          >
            Авторизация
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
