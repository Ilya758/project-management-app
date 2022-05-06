import { NavLink } from 'react-router-dom';
import './Header.css';

export const Authorization = () => {
  const language = ['Ru', 'En'];
  return (
    <nav>
      <button className="language">{language[0]}</button>
      <NavLink to="/authentication/login" className="signUp">
        <i className="fas fa-user" aria-hidden="true"></i>
      </NavLink>
    </nav>
  );
};
