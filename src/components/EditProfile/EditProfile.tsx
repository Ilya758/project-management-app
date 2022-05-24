import { useState, useEffect } from 'react';
import { PATH } from '../../constants/path';
import axios from 'axios';
import { IUser } from '../../models/users';
import { IErrorMessage } from '../../services/services.auth';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import '../Authentication/Authentication.scss';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../requests/user';
import { useTranslation } from 'react-i18next';

export const EditProfile = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<IUser>({} as IUser);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    editUser().then((user) => {
      if (user) {
        setUser(user);
        setName(user.name);
        setLogin(user.login);
      }
    });
  }, []);

  const handleOnChangeName = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.currentTarget.value as string);
  };

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin(e.currentTarget.value as string);
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.currentTarget.value as string);
  };

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .put(PATH.UPDATE_USER(user.id), { login, name, password })
        .then(() => navigate('/main'));
    } catch (error) {
      setError((error as IErrorMessage).response.data.message);
    }
  };

  return (
    <div className="wrapper-component center">
      <Container component="div" maxWidth="xs">
        <Typography component="h3" variant="h5">
          {t('edit_Profile.edit_profile')}
        </Typography>
        <Box component="form" onSubmit={handerSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('edit_Profile.name')}
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleOnChangeName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('edit_Profile.login')}
            autoComplete="login"
            autoFocus
            value={login}
            onChange={handleOnChangeLogin}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('edit_Profile.password')}
            type="password"
            autoComplete="Create Your Password"
            value={password}
            onChange={handleOnChangePassword}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('edit_Profile.save')}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
    </div>
  );
};
