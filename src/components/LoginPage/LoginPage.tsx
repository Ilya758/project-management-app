import { useState } from 'react';
import authService from '../../services/services.auth';
import { StyledLoginPage } from './LoginPages.styles';
import Button from '@mui/material/Button';
import { Container, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin(e.currentTarget.value as string);
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.currentTarget.value as string);
  };

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await authService.singin(login, password);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledLoginPage>
        <div className="container">
          <Typography variant="h5" component="h3">
            Login to your account
          </Typography>
          <form className="form" onSubmit={handerSubmit}>
            <div className="form__row">
              <div className="form__row-input">
                <TextField label="Login" type="text" value={login} onChange={handleOnChangeLogin} />
              </div>
            </div>
            <div className="form__row">
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            <div className="form__row form__row-fotter">
              <Button
                type="submit"
                variant="contained"
                disabled={!login.length || !password.length}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </StyledLoginPage>
    </Container>
  );
};

export default LoginPage;
