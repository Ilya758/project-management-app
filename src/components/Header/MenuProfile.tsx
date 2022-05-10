import { NavLink } from 'react-router-dom';
import './Header.css';

export const Menu = () => {
  return (
    <div className="container-link">
      <NavLink to="/board" className="link-profile">
        Create new board
      </NavLink>
      <NavLink to="/edit_profile" className="link-profile">
        Edit profile
      </NavLink>
      <NavLink to="/login" className="link-profile">
        logout
      </NavLink>
      <button className="delete-user">Delete User</button>
    </div>
  );
};
