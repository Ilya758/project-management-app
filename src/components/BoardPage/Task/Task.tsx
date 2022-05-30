import { useRef, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../Column/constants';
import { BoardInfo, ColumnInfo, TaskInfo } from '../../../common/common.types';
import { updateTaskOrder } from '../../../common/utils/updateTaskOrder';
import { deleteTaskFromArray } from '../../../common/utils/deleteTastFromArray';
import update from 'immutability-helper';
import { addTaskIntoArray } from '../../../common/utils/addTaskIntoArray';

export interface TDraggingTask {
  boardId: string;
  columnId: string;
  task: TaskInfo;
}

const Task = ({
  task,
  boardId,
  columnId,
  editTask,
  updateBoard,
  showError,
  setBoard,
}: TaskProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const { t } = useTranslation();

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

  const [, drag] = useDrag(() => ({
    type: ItemTypes.task,
    item: () => {
      return { boardId, columnId, task, id: task.id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.task,
    drop: (droppedTask: TDraggingTask) => {
      if (columnId === droppedTask.columnId) {
        setBoard((board: BoardInfo | null) => {
          const { tasks } = board?.columns.find(({ id }) => id === columnId) as ColumnInfo;

          const currentDroppedTask = tasks.find(({ id }) => id === droppedTask.task.id) as TaskInfo;

          const dropArea = tasks.find(({ id }) => id === task.id) as TaskInfo;

          const updatedBoard = updateTaskOrder(
            columnId,
            dropArea.order,
            board as BoardInfo,
            board?.id as string,
            currentDroppedTask.id
          ) as BoardInfo;

          return updatedBoard;
        });
      } else {
        setBoard((board: BoardInfo | null) => {
          let cloneBoard = { ...board } as BoardInfo;

          let columnForDeleteTask = cloneBoard?.columns.find(
            ({ id }) => id === droppedTask.columnId
          ) as ColumnInfo;

          const columnForDeleteTaskIndex = cloneBoard?.columns.indexOf(columnForDeleteTask);

          let { tasks } = columnForDeleteTask;

          const deletingTask = tasks.find(({ id }) => id === droppedTask.task.id);

          const fixedAfterDeletingTasks = deleteTaskFromArray(
            tasks,
            droppedTask.task.id
          ) as TaskInfo[];

          tasks = update(tasks, { $set: fixedAfterDeletingTasks });

          columnForDeleteTask = update(columnForDeleteTask, {
            tasks: { $set: tasks },
          });

          cloneBoard = update(cloneBoard, {
            columns: {
              [columnForDeleteTaskIndex]: { $set: columnForDeleteTask },
            },
          });

          const columnToAddTask = cloneBoard.columns.find(({ id }) => id === columnId);

          const dropArea = columnToAddTask?.tasks.find(({ id }) => id === task.id) as TaskInfo;

          const updatedBoard = addTaskIntoArray(
            droppedTask.columnId,
            columnToAddTask?.id as string,
            dropArea.order,
            cloneBoard as BoardInfo,
            cloneBoard?.id as string,
            deletingTask as TaskInfo
          ) as BoardInfo;

          return updatedBoard;
        });
      }
    },
  }));

  const ref = useRef(null);

  drag(drop(ref));

  return (
    <>
      <div ref={ref} className="task">
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
        <DialogTitle id="alert-dialog-title">{t('modal.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleDeleteTask} autoFocus>
            {t('modal.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;
