import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boardsService from '../../../services/services.boards';
import { BoardProps } from './Board.types';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Board.scss';

const Board = ({ board, updateBoards }: BoardProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteColumn = () => {
    boardsService
      .deleteBoard(board.id)
      .then(() => {
        setOpen(false);
        updateBoards();
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  const handleUpdateColumn = () => {
    navigate(`/boards/${board.id}`);
  };

  return (
    <>
      <div className="board" onClick={handleUpdateColumn}>
        <div className="board__header">
          <div className="board__title">{board.title} </div>
          <div className="board__commands">
            <div className="board__delete board__btn" onClick={handleOpen}>
              <DeleteIcon color="action" fontSize="small" />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete without possibility of recovery?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteColumn} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default Board;
