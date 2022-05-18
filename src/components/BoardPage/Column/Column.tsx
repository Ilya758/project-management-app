import { useState } from 'react';
import Task from '../Task/Task';
import { ColumnProps } from './Column.types';
import { useNavigate } from 'react-router-dom';
import './Column.scss';
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
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import columnsService from '../../../services/services.columns';

const Column = ({ column, boardId, updateBoard }: ColumnProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteColumn = () => {
    columnsService
      .deleteColumn(boardId, column.id)
      .then(() => {
        setOpen(false);
        updateBoard(boardId);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  const handleUpdateColumn = () => {
    navigate(`/boards/${boardId}/columns/${column.id}`);
  };

  const handleCreateTask = () => {
    navigate(`/boards/${boardId}/columns/${column.id}/tasks`);
  };

  return (
    <>
      <div className="column">
        <div className="column__header">
          <div className="column__title">{column.title}</div>
          <div className="column__commands">
            <div className="column__edit column__btn" onClick={handleUpdateColumn}>
              <EditIcon color="action" fontSize="small" />
            </div>
            <div className="column__delete column__btn" onClick={handleOpen}>
              <DeleteIcon color="action" fontSize="small" />
            </div>
          </div>
        </div>
        {column.tasks.length > 0 && (
          <div className="column__container">
            {column.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                boardId={boardId}
                columnId={column.id}
                updateBoard={updateBoard}
              />
            ))}
          </div>
        )}
        <div className="column__footer">
          <div className="column__add-task column__btn" onClick={handleCreateTask}>
            <AddIcon color="success" />
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
        {error && <Alert severity="error">{error}</Alert>}
      </Dialog>
    </>
  );
};

export default Column;
