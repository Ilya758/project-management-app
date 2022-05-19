import './MainPage.scss';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import { BoardInfo } from '../../common/common.types';
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

const MainPage = () => {
  const [boards, setBoards] = useState<BoardInfo[]>([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateBoards = () => {
    boardsService
      .getBoards()
      .then((result) => {
        setBoards(result);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  useEffect(() => {
    updateBoards();
  }, []);

  const handleCreateBoard = () => {
    boardsService
      .createBoard(title)
      .then(() => {
        setTitle('');
        updateBoards();
        setOpen(false);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      <div className="mainPage">
        <div className="mainPage__header">
          <div className="mainPage__title">Boards</div>
        </div>
        <div className="mainPage__container">
          {boards.map((board) => (
            <Board key={board.id} board={board} updateBoards={updateBoards}></Board>
          ))}
          <Card sx={{ height: 'min-content' }}>
            <div className="mainPage__add" onClick={handleClickOpen}>
              <AddIcon color="success" />
            </div>
          </Card>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New board</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateBoard}>Create</Button>
        </DialogActions>
      </Dialog>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default MainPage;
