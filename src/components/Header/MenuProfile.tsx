import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import authService from '../../services/services.auth';
import { Modal, IProps } from '../ConfirmationModal/ConfirmationModal';
import { IUser } from '../../models/users';
import './Header.scss';
import { PATH } from '../../constants/path';

const MenuComponent: FC<IProps> = ({ openModal }) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<IUser[]>(PATH.USERS).then((response) => {
      const login = localStorage.getItem('login');
      const user = response.data.find((elem) => elem.login === login);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const isAuthorize = authService.isAuthorize();
  const signOut = () => {
    authService.singout();
    navigate('/authentication/login');
  };

  const deleteUser = (id: string) => {
    openModal(() => {
      axios.delete(PATH.DELETE_USER(id)).then(signOut);
    });
  };

  return (
    <div className="container-link">
      {isAuthorize && (
        <>
          <NavLink to="boards/:boardId/columns/:columnId/tasks" className="link-profile">
            Create New Board
          </NavLink>
          <NavLink to="profile" className="link-profile">
            Edit Profile
          </NavLink>
          <button className="link-profile" onClick={signOut}>
            Sign Out
          </button>
          <button className="delete-user" onClick={() => deleteUser(user.id)}>
            Delete User
          </button>
        </>
      )}
    </div>
  );
};

export const Menu = Modal(MenuComponent);
