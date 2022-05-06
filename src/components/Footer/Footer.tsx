import { DEVELOPERS } from '../../constants/developers';
import './Footer.css';

export const Footer = () => {
  const nickTemplate = () => {
    return DEVELOPERS.map((elem) => {
      return (
        <a href={elem.host} key={elem.name}>
          <i className="fab fa-github"></i>
          {elem.name}
        </a>
      );
    });
  };

  return (
    <footer>
      <div className="containerFooter">
        <span>© 2022</span>
        <div className="containerDevelopUsers">{nickTemplate()}</div>
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
