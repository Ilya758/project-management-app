import { TaskInfo } from '../../../common/common.types';

export type TaskProps = {
  task: TaskInfo;
  boardId: string;
  columnId: string;
  updateBoard: (boardId: string) => void;
};
