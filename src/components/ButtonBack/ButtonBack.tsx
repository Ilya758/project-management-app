import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

export const ButtonBack = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="outlined"
      color="success"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => navigate(-1)}
      className="button_back"
    >
      {t('button.back')}
    </Button>
  );
};
