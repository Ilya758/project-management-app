import { useRef, useState } from 'react';
import Task from '../Task/Task';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ColumnProps } from './Column.types';
import './Column.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import columnsService from '../../../services/services.columns';
import {
  BoardInfo,
  ColumnInfo,
  taskDefault,
  TaskInfo,
  UserInfo,
} from '../../../common/common.types';
import usersService from '../../../services/services.users';
import tasksService from '../../../services/services.tasks';
import filesService from '../../../services/services.files';
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

const Column = ({
  column,
  boardId,
  updateBoard,
  showError,
  updateColumnOrder,
  setBoard,
}: ColumnProps) => {
  const [title, setTitle] = useState(column.title);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [task, setTask] = useState<TaskInfo>(taskDefault);
  const { t } = useTranslation();

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
        updateBoard();
      })
      .catch((error) => {
        showError((error as { message: string }).message);
      });
  };

  const handleClickTitle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleClickTitleCancel = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTitle(column.title);
    setIsEditing(false);
  };

  const handleClickTitleDone = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    columnsService
      .updateColumn(boardId, column.id, title, column.order)
      .then(() => {
        setIsEditing(false);
        updateBoard();
      })
      .catch((error) => {
        showError((error as { message: string }).message);
      });
  };

  const handleCreateTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTask({ ...taskDefault, order: column.tasks.length + 1 });
    setUser(null);
    editTask(taskDefault);
  };

  const handleTaskEditClose = () => {
    setOpenEdit(false);
  };

  const handleChangeUser = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: UserInfo | null
  ) => {
    setUser(newValue);
    if (newValue) {
      setTask({ ...task, userId: newValue.id });
    }
  };

  const getUsers = async () => {
    usersService.getUsers().then((result) => {
      setUsers(result);
    });
  };

  const getTask = async (task: TaskInfo) => {
    if (task.id) {
      tasksService.getTask(boardId, column.id, task.id).then((result) => {
        setTask(result);
      });
    }
  };

  const editTask = (task: TaskInfo) => {
    Promise.all([getUsers(), getTask(task)])
      .then(() => {
        const selectedUser = users.find((x) => x.id == task.userId);
        if (selectedUser) {
          setUser(selectedUser);
        }
        setOpenEdit(true);
        showError('');
      })
      .catch((error) => {
        showError((error as { message: string }).message);
      });
  };

  const handleTaskEdit = () => {
    if (task.id) {
      tasksService
        .updateTask(boardId, column.id, task)
        .then(() => {
          setOpenEdit(false);
          updateBoard();
        })
        .catch((error) => {
          showError((error as { message: string }).message);
        });
    } else {
      tasksService
        .createTask(boardId, column.id, task)
        .then(() => {
          setOpenEdit(false);
          updateBoard();
        })
        .catch((error) => {
          showError((error as { message: string }).message);
        });
    }
  };

  function bytesToSize(bytes: number): string {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }

  const [, drag] = useDrag(() => ({
    type: ItemTypes.column,
    item: () => {
      return { boardId, id: column.id, type: ItemTypes.column };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.column,
    drop: (item: ColumnInfo) => {
      setBoard((prevState: BoardInfo | null) => {
        const cloneColumns = (prevState as BoardInfo).columns;
        const dropArea = cloneColumns.find((col) => col.id === column.id) as ColumnInfo;
        return updateColumnOrder(
          item.id,
          dropArea.order,
          prevState as BoardInfo,
          prevState?.id as string
        );
      });
    },
  }));

  const ref = useRef(null);

  drag(drop(ref));

  return (
    <>
      <div ref={ref} className="column">
        <div className="column__header">
          {isEditing || (
            <div className="column__title" onClick={handleClickTitle}>
              {title}
            </div>
          )}
          {isEditing && (
            <div className="column__title">
              <input
                className="column__title-input"
                type="text"
                value={title}
                onChange={handleChangeTitle}
              />
            </div>
          )}
          <div className="column__commands">
            {isEditing || (
              <div className="column__edit column__btn" onClick={handleClickTitle}>
                <EditIcon color="action" fontSize="small" />
              </div>
            )}
            {isEditing && (
              <>
                <div className="column__btn" onClick={handleClickTitleDone}>
                  <DoneIcon color="action" fontSize="small" />
                </div>
                <div className="column__btn" onClick={handleClickTitleCancel}>
                  <CancelIcon color="action" fontSize="small" />
                </div>
              </>
            )}
            <div className="column__delete column__btn" onClick={handleOpen}>
              <DeleteIcon color="action" fontSize="small" />
            </div>
          </div>
        </div>
        {column.tasks.length > 0 && (
          <div className="column__container">
            {column.tasks
              .sort((a, b) => a.order - b.order)
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  boardId={boardId}
                  columnId={column.id}
                  updateBoard={updateBoard}
                  editTask={editTask}
                  showError={showError}
                  setBoard={setBoard}
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
        <DialogTitle id="alert-dialog-title">{t('modal.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('modal.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleDeleteColumn} autoFocus>
            {t('modal.yes')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleTaskEditClose}>
        <DialogTitle>{t('modal.create.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
            <TextField
              margin="normal"
              required
              label={t('task.title')}
              autoFocus
              value={task.title}
              onChange={(e) => {
                setTask({ ...task, title: e.currentTarget.value });
              }}
            />
            <TextField
              margin="normal"
              required
              label={t('task.description')}
              value={task.description}
              onChange={(e) => {
                setTask({ ...task, description: e.currentTarget.value });
              }}
            />
            <Autocomplete
              options={users}
              getOptionLabel={(option: UserInfo) => `${option.name} (${option.login})`}
              value={user}
              onChange={handleChangeUser}
              renderInput={(params) => (
                <TextField {...params} margin="normal" required label={t('task.user')} />
              )}
            />
            {task.id && (
              <>
                <TextField
                  margin="normal"
                  label={t('task.order')}
                  value={task.order}
                  onChange={(e) => {
                    const order = Number.parseInt(e.currentTarget.value);
                    if (!Number.isNaN(order)) {
                      setTask({ ...task, order });
                    }
                  }}
                />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  {t('task.upload')}
                  <input
                    type="file"
                    hidden
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.currentTarget.files) {
                        filesService
                          .upload(task, e.currentTarget.files)
                          .then(() => {
                            getTask(task);
                          })
                          .catch((error) => {
                            showError((error as { message: string }).message);
                          });
                      }
                    }}
                  />
                </Button>
              </>
            )}
            {task.files.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
                {task.files.map((file, index) => (
                  <div
                    key={index}
                    className="task__file"
                    onClick={() => {
                      filesService.download(task, file);
                    }}
                  >
                    {`${index + 1}. ${file.filename} - ${bytesToSize(file.fileSize)}`}
                  </div>
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskEditClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleTaskEdit}>
            {task.id ? t('modal.edit.yes') : t('modal.create.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Column;
