import { BoardInfo } from '../../../common/common.types';

export type BoardProps = {
  board: BoardInfo;
  updateBoards: () => void;
};
