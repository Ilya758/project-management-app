import { useState, useEffect, useContext } from 'react';
import authService, { IErrorMessage } from '../../services/services.auth';
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Authentication/Authentication.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Context } from '../../common/common.context';
import { userDefault, UserInfo } from '../../common/common.types';
import usersService from '../../services/services.users';

export const EditProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setIsAuthorize } = useContext(Context);

  const [user, setUser] = useState<UserInfo>(userDefault);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isWait, setIsWait] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = () => {
    usersService
      .deleteUser(user.id)
      .then(() => {
        authService.singout();
        setIsAuthorize(false);
        navigate('/');
      })
      .catch((error) => {
        setError((error as IErrorMessage).response.data.message);
      });
  };

  useEffect(() => {
    setError('');
    usersService
      .getUsers()
      .then((result) => {
        const login = localStorage.getItem('login');
        const users = result as UserInfo[];
        const findUser = users.find((x) => x.login == login);
        if (findUser) {
          setUser(findUser);
        }
      })
      .catch((error) => {
        setError((error as IErrorMessage).response.data.message);
      });
  }, []);

  const handleOnChangeName = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, name: e.currentTarget.value as string });
  };

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, login: e.currentTarget.value as string });
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.currentTarget.value as string);
  };

  const nameValid = () => !!user.name;
  const passwordValid = () => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameValid() && passwordValid()) {
      setIsWait(true);
      setError('');
      usersService
        .updateUser(user, password)
        .then(() => navigate('/main'))
        .catch((error) => {
          setError((error as IErrorMessage).response.data.message);
        });
      setIsWait(false);
    }
    setVerified(true);
  };

  return (
    <div className="wrapper-component center">
      <Container
        component="div"
        maxWidth="xs"
        sx={{ bgcolor: 'rgb(250, 250, 250)', borderRadius: '5px', pt: 2 }}
      >
        <Typography component="h3" variant="h5">
          {t('user.caption')}
        </Typography>
        <Box component="form" onSubmit={handerSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label={t('user.login')}
            autoComplete="login"
            disabled
            value={user.login}
            onChange={handleOnChangeLogin}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('user.name')}
            autoComplete="name"
            autoFocus
            value={user.name}
            onChange={handleOnChangeName}
            error={verified && !nameValid()}
            helperText={verified && !nameValid() ? t('validation.empty') : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('user.password')}
            type="password"
            value={password}
            onChange={handleOnChangePassword}
            error={verified && !passwordValid()}
            helperText={verified && !passwordValid() ? t('validation.password') : ''}
          />
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              className="delete-user"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClickOpen}
              title={t('modal.delete.title')}
            >
              <DeleteIcon sx={{ ml: 1 }} />
              <span style={{ marginRight: '16px' }}>{t('modal.delete.title')}</span>
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('modal.edit.yes')}
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>{isWait && <LinearProgress color="secondary" />}</Box>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('modal.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('modal.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleDeleteUser} autoFocus>
            {t('modal.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
