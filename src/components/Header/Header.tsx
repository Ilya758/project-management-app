import { NavLink } from 'react-router-dom';
import { Menu } from './MenuProfile';
import { Authorization } from './Authorization';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="nav-container">
        <NavLink to="/" className="logo"></NavLink>
        <Menu />
      </div>
      <Authorization />
    </header>
  );
};
