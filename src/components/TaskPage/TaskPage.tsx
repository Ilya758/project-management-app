import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Autocomplete, Box, Button, Card, Container, TextField } from '@mui/material';
import './TaskPage.scss';
import { TaskInfo, UserInfo } from '../../common/common.types';
import tasksService from '../../services/services.tasks';
import usersService from '../../services/services.users';

const TaskPage = () => {
  const { boardId, columnId, taskId } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState<TaskInfo>(
    (taskId ? {} : { title: 'New task', order: 1 }) as TaskInfo
  );

  const [users, setUsers] = useState<UserInfo[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (boardId && columnId) {
      if (taskId) {
        try {
          await tasksService.updateTask(boardId, columnId, taskId, task);
          navigate(-1);
        } catch (error) {
          setError((error as { message: string }).message);
        }
      } else {
        try {
          await tasksService.createTask(boardId, columnId, task);
          navigate(-1);
        } catch (error) {
          setError((error as { message: string }).message);
        }
      }
    }
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const result = await usersService.getUsers();
        setUsers(result);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    }

    async function getTask(boardId: string, columnId: string, taskId: string) {
      try {
        const result = await tasksService.getTask(boardId, columnId, taskId);
        setTask(result);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    }

    getUsers();
    if (taskId) {
      if (boardId && columnId) {
        getTask(boardId, columnId, taskId);
      } else {
        setError('Parameters is not correct.');
      }
    }
  }, [boardId, columnId, taskId]);

  useEffect(() => {
    const selectedUser = users.find((x) => x.id == task.userId);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [users, task]);

  const handleChangeUser = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: UserInfo | null
  ) => {
    setUser(newValue);
    if (newValue) {
      setTask({ ...task, userId: newValue.id });
    }
  };

  return (
    <>
      <div className="taskPage">
        <Container maxWidth="xs">
          <div className="taskPage__header">Task</div>
          <Card>
            <div className="taskPage__container">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', m: 2 }}
              >
                <TextField
                  margin="normal"
                  required
                  label="Title"
                  autoFocus
                  value={task.title}
                  onChange={(e) => {
                    setTask({ ...task, title: e.currentTarget.value });
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  label="Order"
                  value={task.order}
                  onChange={(e) => {
                    const order = Number.parseInt(e.currentTarget.value);
                    if (!Number.isNaN(order)) {
                      setTask({ ...task, order });
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  label="Description"
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
                    <TextField {...params} label="User" variant="standard" />
                  )}
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {columnId ? 'Save' : 'Create'}
                </Button>
              </Box>
            </div>
          </Card>
        </Container>
        <div className="taskPage__footer">{error && <Alert severity="error">{error}</Alert>}</div>
      </div>
    </>
  );
};

export default TaskPage;
