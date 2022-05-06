import { NavLink, Outlet } from 'react-router-dom';
import './Authentication.css';

export const Authentication = () => {
  return (
    <div className="wrapper-component">
      <div className="component">
        <NavLink to="login">Login</NavLink>
        <NavLink to="registration">Registration</NavLink>
        <Outlet />
      </div>
    </div>
  );
};
