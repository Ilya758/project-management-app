import { ColumnInfo } from '../../../common/common.types';

export type ColumnProps = {
  column: ColumnInfo;
  boardId: string;
  updateBoard: (boardId: string) => void;
};
