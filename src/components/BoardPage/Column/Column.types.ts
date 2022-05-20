import { ColumnInfo } from '../../../common/common.types';

export type ColumnProps = {
  column: ColumnInfo;
  boardId: string;
  updateBoard: () => void;
  showError: (message: string) => void;
};
