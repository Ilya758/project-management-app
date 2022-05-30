import { TaskInfo } from '../common.types';

export const deleteTaskFromArray = (tasks: TaskInfo[], taskId: string) =>
  tasks.filter(({ id }) => id !== taskId);
