import { BoardInfo, ColumnInfo } from '../common.types';
import { fixArrayItemsOrder } from './fixColumnOrder';
import update from 'immutability-helper';
import columnsService from '../../services/services.columns';

export const updateColumnOrder = (
  columnId: string,
  columnOrder: number,
  board: BoardInfo,
  boardId: string
) => {
  const cloneColumns = (board as BoardInfo).columns;

  let droppedColumn = cloneColumns.find(({ id }) => id === columnId) as ColumnInfo;

  const droppedColumnIndex = cloneColumns.indexOf(droppedColumn);

  const dropAreaIndex = cloneColumns.findIndex(({ order }) => order === columnOrder);

  droppedColumn = { ...droppedColumn, order: columnOrder };

  const newColumns = update(cloneColumns, {
    $splice: [
      [droppedColumnIndex, 1],
      [dropAreaIndex, 0, cloneColumns[droppedColumnIndex]],
    ],
  });

  const fixedColumns = fixArrayItemsOrder(newColumns) as ColumnInfo[];

  const updatedBoard = { ...board, columns: fixedColumns };

  columnsService.updateColumn(
    boardId as string,
    columnId,
    droppedColumn.title,
    droppedColumn.order
  );

  return {
    ...updatedBoard,
  };
};
