import './MainPage.scss';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import { boardDefault, BoardInfo } from '../../common/common.types';
import boardsService from '../../services/services.boards';
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import Board from './Board/Board';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../Spinner/Spinner';

const MainPage = () => {
  const [boards, setBoards] = useState<BoardInfo[]>([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [board, setBoard] = useState<BoardInfo>(boardDefault);
  const [isFetching, setIsFetching] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateBoards = () => {
    setIsFetching(true);
    boardsService
      .getBoards()
      .then((result) => {
        setBoards(result);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      })
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    updateBoards();
  }, []);

  const handleCreateBoard = () => {
    boardsService
      .createBoard(board)
      .then(() => {
        setBoard(boardDefault);
        updateBoards();
        setOpen(false);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard({ ...board, title: e.currentTarget.value });
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard({ ...board, description: e.currentTarget.value });
  };

  return (
    <>
      <div className="mainPage">
        {isFetching && <Spinner />}
        <div className="mainPage__header">
          <div className="mainPage__title">{t('boards.caption')}</div>
        </div>
        <div className="mainPage__container">
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              updateBoards={updateBoards}
              setError={setError}
            ></Board>
          ))}
          <Card sx={{ height: 'min-content' }}>
            <div className="mainPage__add" onClick={handleClickOpen}>
              <AddIcon color="success" />
            </div>
          </Card>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('modal.create.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={t('board.title')}
            type="text"
            fullWidth
            variant="standard"
            value={board.title}
            onChange={handleChangeTitle}
          />
          <TextField
            margin="dense"
            label={t('board.description')}
            type="text"
            fullWidth
            variant="standard"
            value={board.description}
            onChange={handleChangeDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleCreateBoard}>{t('modal.create.yes')}</Button>
        </DialogActions>
      </Dialog>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default MainPage;
