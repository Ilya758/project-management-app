import { useContext, useState } from 'react';
import authService from '../../services/services.auth';
import Button from '@mui/material/Button';
import { Alert, Avatar, Box, Container, TextField, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../common/common.context';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthorize } = useContext(Context);

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
    setError('');
    try {
      await authService.singup(name, login, password);
      await authService.singin(login, password);
      setIsAuthorize(true);
      navigate('/main');
    } catch (error) {
      setError((error as { message: string }).message);
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('header.signup')}
        </Typography>
        <Box component="form" onSubmit={handerSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('user.name')}
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleOnChangeName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('user.login')}
            autoComplete="login"
            autoFocus
            value={login}
            onChange={handleOnChangeLogin}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('user.password')}
            type="password"
            autoComplete="password"
            value={password}
            onChange={handleOnChangePassword}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('header.signup')}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
