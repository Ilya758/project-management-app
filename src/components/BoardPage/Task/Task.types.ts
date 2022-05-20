import { TaskInfo } from '../../../common/common.types';

export type TaskProps = {
  task: TaskInfo;
  boardId: string;
  columnId: string;
  updateBoard: () => void;
  editTask: (task: TaskInfo) => void;
  showError: (message: string) => void;
};
