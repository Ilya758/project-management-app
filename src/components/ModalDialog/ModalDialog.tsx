import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { DialogProps } from './ModalDialog.types';
import { useTranslation } from 'react-i18next';

const ModalDialog = ({ open, handleClose, title, description, handleOk }: DialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('modal.cancel')}</Button>
        <Button onClick={handleOk} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
