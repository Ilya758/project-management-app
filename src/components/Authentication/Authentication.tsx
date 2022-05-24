import { Outlet } from 'react-router-dom';
import './Authentication.scss';
import '../Header/Header.scss';

export const Authentication = () => {
  return (
    <div className="wrapper-component">
      <div className="container-login-form">
        <Outlet />
      </div>
    </div>
  );
};
