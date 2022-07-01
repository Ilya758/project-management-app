import { BoardInfo, ColumnInfo } from '../../../common/common.types';

export type ColumnProps = {
  column: ColumnInfo;
  boardId: string;
  updateBoard: () => void;
  showError: (message: string) => void;
  updateColumnOrder: (
    columnId: string,
    columnOrder: number,
    board: BoardInfo,
    boardId: string
  ) => BoardInfo;
  columns: ColumnInfo[];
  board: BoardInfo;
  setBoard: React.Dispatch<React.SetStateAction<BoardInfo | null>>;
};
