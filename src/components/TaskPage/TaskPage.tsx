import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, Container, TextField } from '@mui/material';
import './TaskPage.scss';
import { TaskInfo } from '../../common/common.types';
import tasksService from '../../services/services.tasks';

const TaskPage = () => {
  const { boardId, columnId, taskId } = useParams();

  const navigate = useNavigate();

  const [task, setColumn] = useState<TaskInfo>(
    (taskId ? {} : { title: 'New task', order: 1 }) as TaskInfo
  );

  const [error, setError] = useState('');

  const handleSubmit = async () => {
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
    async function getTask(boardId: string, columnId: string, taskId: string) {
      try {
        const result = await tasksService.getTask(boardId, columnId, taskId);
        setColumn(result);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    }

    if (taskId) {
      if (boardId && columnId) {
        getTask(boardId, columnId, taskId);
      } else {
        setError('Parameters is not correct.');
      }
    }
  }, [boardId, columnId, taskId]);

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
                    setColumn({ ...task, title: e.currentTarget.value });
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
                      setColumn({ ...task, order });
                    }
                  }}
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {columnId ? 'Save' : 'Create'}
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </Box>
            </div>
          </Card>
        </Container>
        <div className="ctaskPage__footer"></div>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default TaskPage;
