import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/services.auth';
import Button from '@mui/material/Button';
import {
  Alert,
  Avatar,
  Box,
  LinearProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { Context } from '../../common/common.context';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthorize } = useContext(Context);
  const [verified, setVerified] = useState(false);
  const [isWait, setIsWait] = useState(false);

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin(e.currentTarget.value as string);
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.currentTarget.value as string);
  };

  const loginValid = () => !!login;
  const passwordValid = () => !!password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginValid() && passwordValid()) {
      setIsWait(true);
      try {
        await authService.singin(login, password);
        setIsAuthorize(true);
        navigate('/main');
      } catch (error) {
        setError((error as { message: string }).message);
      }
      setIsWait(false);
    }
    setVerified(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'rgb(250, 250, 250)',
          borderRadius: '5px',
          p: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('header.signin')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('user.login')}
            autoComplete="login"
            autoFocus
            value={login}
            onChange={handleOnChangeLogin}
            error={verified && !loginValid()}
            helperText={verified && !loginValid() ? t('validation.empty') : ''}
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
            error={verified && !passwordValid()}
            helperText={verified && !passwordValid() ? t('validation.empty') : ''}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('header.signin')}
          </Button>
          <Box sx={{ width: '100%' }}>{isWait && <LinearProgress color="secondary" />}</Box>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
