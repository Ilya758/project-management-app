import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Context } from '../../common/common.context';

export const Menu = () => {
  const { t } = useTranslation();
  const { isAuthorize } = useContext(Context);

  return (
    <>
      {isAuthorize && (
        <div className="container-link">
          <NavLink to="main" className="link-profile">
            {t('boards.title')}
          </NavLink>
        </div>
      )}
    </>
  );
};
