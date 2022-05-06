import { NavLink } from 'react-router-dom';
import './Header.css';

export const Menu = () => {
  return (
    <div className="nav-container-link">
      <NavLink to="/board">Create new board</NavLink>
      <NavLink to="/edit_profile">Edit profile</NavLink>
      <NavLink to="/login">logout</NavLink>
      <button className="delete-user">Delete User</button>
    </div>
  );
};
