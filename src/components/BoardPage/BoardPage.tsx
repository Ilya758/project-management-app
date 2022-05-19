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

const BoardPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardInfo>();
  const [error, setError] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState('');

  function updateBoard() {
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

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleCreateColumn = () => {
    if (board) {
      columnsService
        .createColumn(board.id, title, board.columns.length + 1)
        .then(() => {
          setTitle('');
          updateBoard();
          setOpenCreate(false);
        })
        .catch((error) => {
          setError((error as { message: string }).message);
        });
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEditColumn = () => {};

  return (
    <>
      {board && (
        <div className="boardPage">
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
                />
              ))}
            <Card sx={{ height: 'min-content' }}>
              <div className="boardPage__add" onClick={handleOpenCreate}>
                <AddIcon color="success" />
              </div>
            </Card>
          </div>
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>New column</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleChangeTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button onClick={handleCreateColumn}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleOpenEdit}>
        <DialogTitle>New column</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleChangeTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEditColumn}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoardPage;
