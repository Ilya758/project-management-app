import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPersonWalkingArrowRight,
  faUser,
  faUserPlus,
  faUserEdit,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import authService from '../../services/services.auth';
import './Header.scss';
import { Context } from '../../common/common.context';
import { useContext } from 'react';
import { SearchPage } from './Search/SearchPage';

export const Authorization = () => {
  const { t, i18n } = useTranslation();
  const { isAuthorize, setIsAuthorize } = useContext(Context);
  const navigate = useNavigate();

  const onLangChange = (nextLang: string) => {
    i18n.changeLanguage(nextLang);
  };

  const signOut = () => {
    authService.singout();
    setIsAuthorize(false);
    navigate('/');
  };

  return (
    <>
      <nav className="nav">
        <div className="language__container">
          <SearchPage />
          <div
            className="language__btn language__btn-en"
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
        <div className="user__container">
          {!isAuthorize ? (
            <>
              <NavLink to="authentication/login" className="signUp" title={t('header.signin')}>
                <FontAwesomeIcon icon={faUser} />
                <span className="nav__text">{t('header.signin')}</span>
              </NavLink>
              <NavLink
                to="authentication/registration"
                className="signUp"
                title={t('header.signup')}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="nav__text">{t('header.signup')}</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="main" className="signUp" title={t('header.linkToMain')}>
                <FontAwesomeIcon icon={faHome} />
                <span className="nav__text">{t('header.linkToMain')}</span>
              </NavLink>
              <NavLink to="profile" className="signUp" title={t('header.profile')}>
                <FontAwesomeIcon icon={faUserEdit} />
                <span className="nav__text">{t('header.profile')}</span>
              </NavLink>
              <NavLink
                to="authentication/login"
                className="signUp"
                title={t('header.signout')}
                onClick={signOut}
              >
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
                <span className="nav__text">{t('header.signout')}</span>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
