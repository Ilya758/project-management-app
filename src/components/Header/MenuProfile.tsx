import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/services.auth';
import './Header.scss';

export const Menu = () => {
  const navigate = useNavigate();
  const isAuthorize = authService.isAuthorize();
  const signOut = () => {
    authService.singout();
    navigate('/authentication/login');
  };

  return (
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
          <button className="delete-user">Delete User</button>
        </>
      )}
    </div>
  );
};
