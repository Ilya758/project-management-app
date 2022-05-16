import { Card } from '@mui/material';
import { TaskProps } from './Task.types';

const Task = ({ task }: TaskProps) => {
  return (
    <Card
      sx={{
        m: 1,
        p: 1,
      }}
    >
      {task.title}
    </Card>
  );
};

export default Task;
