import { useState } from 'react';
import { TaskProps } from './Task.types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './Task.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import tasksService from '../../../services/services.tasks';

const Task = ({ task, boardId, columnId, editTask, updateBoard, showError }: TaskProps) => {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    updateBoard();
  };

  const handleDeleteTask = () => {
    tasksService
      .deleteTask(boardId, columnId, task.id)
      .then(() => {
        setOpenDelete(false);
        updateBoard();
      })
      .catch((error) => {
        showError((error as { message: string }).message);
      });
  };

  const handleUpdateTask = () => {
    editTask(task);
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
        open={openDelete}
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
      </Dialog>
    </>
  );
};

export default Task;
