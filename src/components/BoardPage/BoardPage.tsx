import React, { useEffect, useState } from 'react';
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
import { BoardInfo } from '../../common/common.types';
import boardsService from '../../services/services.boards';
import Column from './Column/Column';
import { useParams } from 'react-router-dom';
import './BoardPage.scss';
import AddIcon from '@mui/icons-material/Add';
import columnsService from '../../services/services.columns';
import { useTranslation } from 'react-i18next';
import { ButtonBack } from '../ButtonBack/ButtonBack';

const BoardPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardInfo>();
  const [error, setError] = useState('');
  const [openCreateColumn, setOpenCreateColumn] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const { t } = useTranslation();

  function updateBoard() {
    if (boardId) {
      boardsService
        .getBoard(boardId)
        .then((result) => {
          setBoard(result);
          setError('');
        })
        .catch((error) => {
          setError((error as { message: string }).message);
        });
    } else {
      setError('Id is required.');
    }
  }

  useEffect(() => {
    if (boardId) {
      boardsService
        .getBoard(boardId)
        .then((result) => {
          setBoard(result);
        })
        .catch((error) => {
          setError((error as { message: string }).message);
        });
    } else {
      setError('Parameter Id is required.');
    }
  }, [boardId]);

  const handleCreateColumnOpen = () => {
    setOpenCreateColumn(true);
  };

  const handleCreateColumnClose = () => {
    setOpenCreateColumn(false);
  };

  const handleCreateColumn = () => {
    if (board) {
      columnsService
        .createColumn(board.id, titleColumn)
        .then(() => {
          setTitleColumn('');
          updateBoard();
          setOpenCreateColumn(false);
        })
        .catch((error) => {
          setError((error as { message: string }).message);
        });
    }
  };

  const handleChangeTitleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleColumn(e.currentTarget.value);
  };

  const showError = (message: string) => {
    setError(message);
  };

  return (
    <>
      {board && (
        <div className="boardPage">
          <div>
            <ButtonBack />
          </div>
          <div className="boardPage__header">
            <div className="boardPage__title">{board.title}</div>
          </div>
          <div className="boardPage__container">
            {board.columns
              .sort((a, b) => a.order - b.order)
              .map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  boardId={board.id}
                  updateBoard={updateBoard}
                  showError={showError}
                />
              ))}
            <Card sx={{ height: 'min-content' }}>
              <div className="boardPage__add" onClick={handleCreateColumnOpen}>
                <AddIcon color="success" />
              </div>
            </Card>
          </div>
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Dialog open={openCreateColumn} onClose={handleCreateColumnClose}>
        <DialogTitle>{t('modal.create.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={t('column.title')}
            type="text"
            fullWidth
            variant="standard"
            value={titleColumn}
            onChange={handleChangeTitleColumn}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateColumnClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleCreateColumn}>{t('modal.create.yes')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoardPage;
