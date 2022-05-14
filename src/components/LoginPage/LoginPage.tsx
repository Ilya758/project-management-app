import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/services.auth';
import { StyledLoginPage } from './LoginPages.styles';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value as string);
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value as string);
  };

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await authService.singin(login, password);
      navigate('/main');
      console.log(token);
    } catch (error) {
      setError((error as { message: string }).message);
    }
  };

  return (
    <StyledLoginPage>
      <div className="container">
        <div className="title">Login to your account</div>
        <form className="form" onSubmit={handerSubmit}>
          <div className="form__row">
            <div className="form__row-label">User</div>
            <div className="form__row-input">
              <input
                className="form__input"
                type="text"
                value={login}
                onChange={handleOnChangeLogin}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row-label">Password</div>
            <div className="form__row-input">
              <input
                className="form__input"
                type="password"
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
          </div>
          <div className="form__row form__row-fotter">
            <div>{error}</div>
            <input
              className="form__submit"
              type="submit"
              value="Login"
              disabled={!login.length || !password.length}
            />
          </div>
        </form>
      </div>
    </StyledLoginPage>
  );
};

export default LoginPage;
