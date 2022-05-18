import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskProps } from './Task.types';
import './Task.scss';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import tasksService from '../../../services/services.tasks';

const Task = ({ task, boardId, columnId, updateBoard }: TaskProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    updateBoard(boardId);
  };

  const handleUpdateTask = () => {
    navigate(`/boards/${boardId}/columns/${columnId}/tasks/${task.id}`);
  };

  const handleDeleteTask = () => {
    tasksService
      .deleteTask(boardId, columnId, task.id)
      .then(() => {
        setOpen(false);
        updateBoard(boardId);
      })
      .catch((error) => {
        setError((error as { message: string }).message);
      });
  };

  return (
    <>
      <div className="task">
        <div className="task__title">{task.title}</div>
        <div className="task__commands">
          <div className="task__edit task__btn" onClick={handleUpdateTask}>
            <EditIcon color="action" fontSize="small" />
          </div>
          <div className="task__delete task__btn" onClick={handleClickOpen}>
            <DeleteIcon color="action" fontSize="small" />
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
          <Button onClick={handleDeleteTask} autoFocus>
            Yes
          </Button>
        </DialogActions>
        {error && <Alert severity="error">{error}</Alert>}
      </Dialog>
    </>
  );
};

export default Task;
