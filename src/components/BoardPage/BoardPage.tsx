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
import { updateColumnOrder } from '../../common/utils/updateColumnOrder';
import { Spinner } from '../Spinner/Spinner';

const BoardPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardInfo | null>({
    columns: [],
    description: '',
    id: '',
    title: '',
  });
  const [error, setError] = useState('');
  const [openCreateColumn, setOpenCreateColumn] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { t } = useTranslation();

  function updateBoard() {
    setIsFetching(true);
    if (boardId) {
      boardsService
        .getBoard(boardId)
        .then((result) => {
          setBoard(result);
          setError('');
        })
        .catch((error) => {
          setError((error as { message: string }).message);
        })
        .finally(() => setIsFetching(false));
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
          {isFetching && <Spinner />}
          <div className="button-back">
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
                  updateColumnOrder={updateColumnOrder}
                  columns={board.columns}
                  setBoard={setBoard}
                  board={board}
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
