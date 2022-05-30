import { NavLink } from 'react-router-dom';
import { Authorization } from './Authorization';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="nav-container">
        <NavLink to="/" className="logo"></NavLink>
      </div>
      <Authorization />
    </header>
  );
};
