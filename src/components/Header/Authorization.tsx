import { NavLink } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import './Header.css';

export const Authorization = () => {
  return (
    <nav className="nav">
      <button className="language">{LANGUAGE[0]}</button>
      <NavLink to="/authentication/login" className="signUp">
        <i className="fas fa-user" aria-hidden="true"></i>
      </NavLink>
    </nav>
  );
};
