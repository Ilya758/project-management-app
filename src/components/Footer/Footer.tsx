import { DEVELOPERS } from '../../constants/developers';
import './Footer.scss';

export const Footer = () => {
  const nickTemplate = () => {
    return DEVELOPERS.map((elem) => {
      return (
        <a href={elem.host} key={elem.name} className="users-link">
          <i className="fab fa-github"></i>
          {elem.name}
        </a>
      );
    });
  };

  return (
    <footer className="footer">
      <div className="container-footer">
        <span>© 2022</span>
        <div className="container-develop-users">{nickTemplate()}</div>
        <a
          href="https://rs.school/react/"
          target="_blank"
          className="rsschool-link"
          rel="noreferrer"
        ></a>
      </div>
    </footer>
  );
};
