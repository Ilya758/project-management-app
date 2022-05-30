import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import authService from '../src/services/services.auth';

interface IProps {
  children: ReactElement;
}

const publicPaths = ['/authentication/login', '/authentication/registration', '/', '/board'];
export const Authentification: FC<IProps> = ({ children }) => {
  const location = useLocation();
  if (!publicPaths.includes(location.pathname) && !authService.isAuthorize()) {
    return <Navigate to="/authentication/login" />;
  }
  if (location.pathname.includes('/authentication') && authService.isAuthorize()) {
    return <Navigate to="/" />;
  }
  return children;
};
