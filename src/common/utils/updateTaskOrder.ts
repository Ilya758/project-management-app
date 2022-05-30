import { BoardInfo, ColumnInfo, TaskInfo } from '../common.types';
import { fixArrayItemsOrder } from './fixColumnOrder';
import update from 'immutability-helper';
import tasksService from '../../services/services.tasks';

export const updateTaskOrder = (
  columnId: string,
  taskOrder: number,
  board: BoardInfo,
  boardId: string,
  taskId: string
) => {
  let cloneColumns = (board as BoardInfo).columns;

  const currentColumn = cloneColumns.find(({ id }) => id === columnId) as ColumnInfo;

  const cloneTasks = [...currentColumn.tasks];

  let droppedTask = cloneTasks.find(({ id }) => id === taskId) as TaskInfo;

  const droppedTaskIndex = cloneTasks.indexOf(droppedTask);

  const dropAreaIndex = cloneTasks.findIndex(({ order }) => order === taskOrder);

  droppedTask = { ...droppedTask, order: taskOrder };

  const newTasks = update(cloneTasks, {
    $splice: [
      [droppedTaskIndex, 1],
      [dropAreaIndex, 0, cloneTasks[droppedTaskIndex]],
    ],
  });

  const fixedTasks = fixArrayItemsOrder(newTasks) as TaskInfo[];

  currentColumn.tasks = fixedTasks;

  const currentColumnIndex = cloneColumns.indexOf(currentColumn);

  cloneColumns = update(cloneColumns, {
    [currentColumnIndex]: { $set: currentColumn },
  });

  const updatedBoard = { ...board, columns: cloneColumns };

  tasksService.updateTask(boardId, columnId, droppedTask);

  return {
    ...updatedBoard,
  };
};
