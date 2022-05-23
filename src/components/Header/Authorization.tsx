import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import authService from '../../services/services.auth';
import './Header.scss';

export const Authorization = () => {
  const { t, i18n } = useTranslation();
  const isAuthorize = authService.isAuthorize();
  const navigate = useNavigate();

  const onLangChange = () => {
    const nextLang = i18n.language == LANGUAGE.En ? LANGUAGE.Ru : LANGUAGE.En;
    i18n.changeLanguage(nextLang);
  };

  const signOut = () => {
    authService.singout();
    navigate('/authentication/login');
  };

  return (
    <nav className="nav">
      <NavLink to="authentication/login" className="signUp" title={t('login.signin')}>
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
      {!isAuthorize ? (
        <NavLink
          to="authentication/registration"
          className="signUp"
          title={t('registration.signup')}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </NavLink>
      ) : (
        <NavLink
          to="authentication/login"
          className="signUp"
          title={t('sign_Out.title')}
          onClick={signOut}
        >
          <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
        </NavLink>
      )}
      <button className="language" onClick={onLangChange}>
        {t('language.en')}
      </button>
    </nav>
  );
};
