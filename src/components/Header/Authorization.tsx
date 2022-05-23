import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import authService from '../../services/services.auth';
import './Header.scss';

export const Authorization = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(LANGUAGE.En);
  const isAuthorize = authService.isAuthorize();
  const navigate = useNavigate();

  const onLangChange = () => {
    const nextLang = lang == LANGUAGE.En ? LANGUAGE.Ru : LANGUAGE.En;
    i18n.changeLanguage(nextLang);
    setLang(nextLang);
  };

  const signOut = () => {
    authService.singout();
    navigate('/authentication/login');
  };

  return (
    <nav className="nav">
      {!isAuthorize ? (
        <>
          <NavLink to="authentication/login" className="signUp" title={t('login.signin')}>
            <i className="fas fa-user" aria-hidden="true"></i>
          </NavLink>
          <NavLink
            to="authentication/registration"
            className="signUp"
            title={t('registration.signup')}
          >
            <i className="fas fa-user-plus" aria-hidden="true"></i>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="authentication/login" className="signUp" title={t('login.signin')}>
            <i className="fas fa-user" aria-hidden="true"></i>
          </NavLink>
          <NavLink
            to="authentication/login"
            className="signUp"
            title={t('sign_Out.title')}
            onClick={signOut}
          >
            <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
          </NavLink>
        </>
      )}
      <button className="language" onClick={onLangChange}>
        {t('language.en')}
      </button>
    </nav>
  );
};
