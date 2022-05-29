import { NavLink } from 'react-router-dom';
import { Authorization } from './Authorization';
import './Header.scss';
import { SearchPage } from './Search/SearchPage';

export const Header = () => {
  return (
    <header className="header">
      <div className="nav-container">
        <NavLink to="/" className="logo"></NavLink>
        <SearchPage />
      </div>
      <Authorization />
    </header>
  );
};
