import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskProps } from './Task.types';
import './Task.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ task, boardId, columnId }: TaskProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateTask = () => {
    navigate(`/boards/${boardId}/columns/${columnId}/tasks/${task.id}`);
  };

  return (
    <>
      <div className="task">
        <div className="task__title" onClick={handleUpdateTask}>
          {task.title}
        </div>
        <div className="task__delete" onClick={handleClickOpen}>
          <DeleteIcon color="action" fontSize="small" />
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
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;
