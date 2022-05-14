import { NavLink, Outlet } from 'react-router-dom';
import './Authentication.scss';
import '../Header/Header.scss';

export const Authentication = () => {
  return (
    <div className="wrapper-component">
      <div className="container-authentication">
        <NavLink to="login" className="login-link">
          Log In
        </NavLink>
        <NavLink to="registration" className="registration-link">
          Registration
        </NavLink>
      </div>
      <div className="container-login-form">
        <Outlet />
      </div>
    </div>
  );
};
