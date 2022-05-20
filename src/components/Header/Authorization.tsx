import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LANGUAGE } from '../../constants/utils';
import './Header.scss';

export const Authorization = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(LANGUAGE.En);

  const onLangChange = () => {
    const nextLang = lang == LANGUAGE.En ? LANGUAGE.Ru : LANGUAGE.En;
    i18n.changeLanguage(nextLang);
    setLang(nextLang);
  };

  return (
    <nav className="nav">
      <button className="language" onClick={onLangChange}>
        {t('language.ru')}
      </button>
      <NavLink to="/authentication/login" className="signUp">
        <i className="fas fa-user" aria-hidden="true"></i>
      </NavLink>
    </nav>
  );
};
