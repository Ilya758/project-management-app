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

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    usersService
      .updateUser(user, password)
      .then(() => navigate('/main'))
      .catch((error) => {
        setError((error as IErrorMessage).response.data.message);
      });
  };

  return (
    <div className="wrapper-component center">
      <Container component="div" maxWidth="xs">
        <Typography component="h3" variant="h5">
          {t('edit_Profile.title')}
        </Typography>
        <Box component="form" onSubmit={handerSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('edit_Profile.name')}
            autoComplete="name"
            autoFocus
            value={user.name}
            onChange={handleOnChangeName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('edit_Profile.login')}
            autoComplete="login"
            autoFocus
            value={user.login}
            onChange={handleOnChangeLogin}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('edit_Profile.password')}
            type="password"
            autoComplete="password"
            value={password}
            onChange={handleOnChangePassword}
          />
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              className="delete-user"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClickOpen}
              title={t('delete.title')}
            >
              <DeleteIcon />
              <span style={{ margin: '0 8px' }}>{t('delete.title')}</span>
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('edit_Profile.save')}
            </Button>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('modal.tit')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('modal.title')}</DialogContentText>
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
