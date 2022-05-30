import { BoardInfo, ColumnInfo, TaskInfo } from '../common.types';
import { fixArrayItemsOrder } from './fixColumnOrder';
import update from 'immutability-helper';
import tasksService from '../../services/services.tasks';

export const addTaskIntoArray = (
  columnId: string,
  newColumnId: string,
  taskOrder: number,
  board: BoardInfo,
  boardId: string,
  droppedTask: TaskInfo
) => {
  let cloneColumns = (board as BoardInfo).columns;

  const currentColumn = cloneColumns.find(({ id }) => id === newColumnId) as ColumnInfo;

  const cloneTasks = [...currentColumn.tasks];

  const dropAreaIndex = cloneTasks.findIndex(({ order }) => order === taskOrder);

  droppedTask = { ...droppedTask, order: taskOrder };

  const newTasks = update(cloneTasks, {
    $splice: [[dropAreaIndex, 0, droppedTask]],
  });

  const fixedTasks = fixArrayItemsOrder(newTasks) as TaskInfo[];

  currentColumn.tasks = fixedTasks;

  const currentColumnIndex = cloneColumns.indexOf(currentColumn);

  cloneColumns = update(cloneColumns, {
    [currentColumnIndex]: { $set: currentColumn },
  });

  const updatedBoard = { ...board, columns: cloneColumns };

  tasksService.updateTask(boardId, newColumnId, droppedTask, columnId);

  return {
    ...updatedBoard,
  };
};
