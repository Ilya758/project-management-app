import { Card, Typography, Box } from '@mui/material';
import Task from '../Task/Task';
import { ColumnProps } from './Column.types';

const Column = ({ column }: ColumnProps) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        heigth: '100%',
      }}
    >
      <Box
        sx={{
          mt: 1,
          ml: 2,
        }}
      >
        <Typography variant="subtitle2" component="h5">
          {column.title}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 1,
          bgcolor: 'rgb(231, 235, 240)',
        }}
      >
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Box>
    </Card>
  );
};

export default Column;
