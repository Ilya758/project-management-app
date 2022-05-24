import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import authService from '../../services/services.auth';
import './Header.scss';
import React from 'react';

export const Authorization = () => {
  const { t, i18n } = useTranslation();
  const isAuthorize = authService.isAuthorize();
  const navigate = useNavigate();

  const onLangChange = (nextLang: string) => {
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
      <div className="language__container">
        <div
          className="language__btn"
          onClick={() => {
            onLangChange(LANGUAGE.En);
          }}
          data-active={i18n.language == LANGUAGE.En}
        >
          {t('language.en')}
        </div>
        <div
          className="language__btn"
          data-active={i18n.language == LANGUAGE.Ru}
          onClick={() => {
            onLangChange(LANGUAGE.Ru);
          }}
        >
          {t('language.ru')}
        </div>
      </div>
    </nav>
  );
};
