import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPersonWalkingArrowRight,
  faUser,
  faUserPlus,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import authService from '../../services/services.auth';
import './Header.scss';
import { Context } from '../../common/common.context';
import { useContext } from 'react';

export const Authorization = () => {
  const { t, i18n } = useTranslation();
  const { isAuthorize, setIsAuthorize } = useContext(Context);
  const navigate = useNavigate();

  const onLangChange = (nextLang: string) => {
    i18n.changeLanguage(nextLang);
  };

  const signOut = () => {
    authService.singout();
    setIsAuthorize(authService.isAuthorize());
    navigate('/authentication/login');
  };

  return (
    <>
      <nav className="nav">
        {!isAuthorize ? (
          <>
            <NavLink to="authentication/login" className="signUp" title={t('login.signin')}>
              <FontAwesomeIcon icon={faUser} />
              <span>{t('login.signin')}</span>
            </NavLink>
            <NavLink
              to="authentication/registration"
              className="signUp"
              title={t('registration.signup')}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span>{t('registration.signup')}</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="profile" className="link-profile" title={t('edit_Profile.title')}>
              <FontAwesomeIcon icon={faUserEdit} />
              <span>{t('edit_Profile.title')}</span>
            </NavLink>
            <NavLink
              to="authentication/login"
              className="signUp"
              title={t('sign_Out.title')}
              onClick={signOut}
            >
              <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
              <span>{t('sign_Out.title')}</span>
            </NavLink>
          </>
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
    </>
  );
};
