import { NavLink } from 'react-router-dom';
import { LOGIN_SUBTITLE } from '../../constants/utils';
import './Authentication.css';
import '../Header/Header.css';

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
      <div className="login-subtitle">{LOGIN_SUBTITLE[0]}</div>
    </div>
  );
};
