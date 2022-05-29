import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchPage.scss';
import { Context } from '../../../common/common.context';
import { IconButton, InputBase, Paper, Popover, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchPage = () => {
  const { t } = useTranslation();
  const { isAuthorize } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isAuthorize && (
        <div className="seach">
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder={t('search.placeholder')} />
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2, borderBottom: 1 }}>{t('search.result')}</Typography>
          </Popover>
        </div>
      )}
    </>
  );
};
