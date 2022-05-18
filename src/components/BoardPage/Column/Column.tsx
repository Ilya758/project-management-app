import { useState } from 'react';
import Task from '../Task/Task';
import { ColumnProps } from './Column.types';
import './Column.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Column = ({ column }: ColumnProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteColumn = () => {
    setOpen(true);
  };

  const handleAddTask = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="column">
        <div className="column__header">
          <div className="column__title" onClick={handleDeleteColumn}>
            {column.title}
          </div>
          <div className="column__delete" onClick={handleDeleteColumn}>
            <DeleteIcon color="action" fontSize="small" />
          </div>
        </div>
        <div className="column__container">
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <div className="column__footer">
          <div className="column__add-task" onClick={handleDeleteColumn}>
            <AddIcon onClick={handleAddTask} color="success" />
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
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Column;
