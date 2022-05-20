import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/services.auth';
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

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigate = useNavigate();
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
              Boards
            </NavLink>
            <NavLink to="profile" className="link-profile">
              Edit Profile
            </NavLink>
            <button className="link-profile" onClick={signOut}>
              Sign Out
            </button>
            <button className="delete-user" onClick={handleClickOpen}>
              Delete User
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
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete without possibility of recovery?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDeleteUser(user.id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
