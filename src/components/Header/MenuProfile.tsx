import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/services.auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './Header.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PATH } from '../../constants/path';
import { IUser } from '../../models/users';
import { useTranslation } from 'react-i18next';

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthorize = authService.isAuthorize();

  useEffect(() => {
    axios.get<IUser[]>(PATH.USERS).then((response) => {
      const login = localStorage.getItem('login');
      const user = response.data.find((elem) => elem.login === login);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    authService.singout();
    navigate('/authentication/login');
  };

  const handleDeleteUser = (id: string) => {
    axios.delete(PATH.DELETE_USER(id)).then(signOut).then(handleClose);
  };

  return (
    <>
      <div className="container-link">
        {isAuthorize && (
          <>
            <NavLink to="main" className="link-profile">
              {t('boards.title')}
            </NavLink>
            <NavLink to="profile" className="link-profile">
              {t('edit_Profile.title')}
            </NavLink>
            <button className="delete-user" onClick={handleClickOpen} title={t('delete.title')}>
              <FontAwesomeIcon icon={faUserXmark} />
            </button>
          </>
        )}
      </div>
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
          <Button onClick={() => handleDeleteUser(user.id)} autoFocus>
            {t('modal.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
