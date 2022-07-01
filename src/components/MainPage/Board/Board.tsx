import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boardsService from '../../../services/services.boards';
import { BoardProps } from './Board.types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import './Board.scss';
import { boardDefault } from '../../../common/common.types';

const Board = ({ board, updateBoards, setError }: BoardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openDelete, setOpenDelete] = useState(false);
  const [openEditBoard, setOpenEditBoard] = useState(false);
  const [editBoard, setEditBoard] = useState(boardDefault);

  const handleOpenDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteColumn = () => {
    boardsService
      .deleteBoard(board.id)
      .then(() => {
        setOpenDelete(false);
        updateBoards();
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  const handleUpdateColumn = () => {
    navigate(`/boards/${board.id}`);
  };

  const handleOpenEditBoard = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditBoard(board);
    setOpenEditBoard(true);
  };

  const handleCloseEditBoard = () => {
    setOpenEditBoard(false);
  };

  const handleEditBoard = () => {
    boardsService
      .updateBoard(editBoard)
      .then(() => {
        updateBoards();
        setOpenEditBoard(false);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditBoard({ ...editBoard, title: e.currentTarget.value });
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditBoard({ ...editBoard, description: e.currentTarget.value });
  };

  return (
    <>
      <div className="board" onClick={handleUpdateColumn}>
        <div className="board__header">
          <div className="board__title">{board.title} </div>
          <div className="board__commands">
            <div className="board__edit board__btn" onClick={handleOpenEditBoard}>
              <EditIcon color="action" fontSize="small" />
            </div>
            <div className="board__delete board__btn" onClick={handleOpenDelete}>
              <DeleteIcon color="action" fontSize="small" />
            </div>
          </div>
        </div>
        <div className="board__container">
          <div className="board__description">{board.description} </div>
        </div>
      </div>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('modal.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('modal.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>{t('modal.cancel')}</Button>
          <Button onClick={handleDeleteColumn} autoFocus>
            {t('modal.yes')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditBoard}
        onClose={handleCloseEditBoard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('modal.edit.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={t('board.title')}
            type="text"
            fullWidth
            variant="standard"
            value={editBoard.title}
            onChange={handleChangeTitle}
          />
          <TextField
            margin="dense"
            label={t('board.description')}
            type="text"
            fullWidth
            variant="standard"
            value={editBoard.description}
            onChange={handleChangeDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditBoard}>{t('modal.cancel')}</Button>
          <Button onClick={handleEditBoard}>{t('modal.edit.yes')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Board;
