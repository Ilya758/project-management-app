import axios from 'axios';
import { API_URL } from '../common/common.constants';
import { BoardInfo } from '../common/common.types';
import authService from './services.auth';
import { IResponceError } from './services.types';

const getBoards = async () => {
  try {
    const resp = await axios.get(API_URL + `boards`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const createBoard = async (board: BoardInfo) => {
  try {
    const resp = await axios.post(
      API_URL + `boards`,
      { title: board.title, description: board.description },
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const getBoard = async (id: string) => {
  try {
    const resp = await axios.get(API_URL + `boards/${id}`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const deleteBoard = async (boardId: string) => {
  let result = true;
  try {
    await axios.delete(API_URL + `boards/${boardId}`, authService.getConfig());
    return result;
  } catch (error) {
    result = false;
  }
  return result;
};

const updateBoard = async (board: BoardInfo) => {
  try {
    const resp = await axios.put(
      API_URL + `boards/${board.id}`,
      { title: board.title, description: board.description },
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const boardsService = {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
};

export default boardsService;
