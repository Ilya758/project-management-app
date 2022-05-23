import axios from 'axios';
import { API_URL } from '../common/common.constants';
import authService from './services.auth';
import { IResponceError } from './services.types';

const getColumns = async (boardId: string) => {
  try {
    const resp = await axios.get(API_URL + `boards/${boardId}/columns`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const createColumn = async (boardId: string, title: string) => {
  try {
    const resp = await axios.post(
      API_URL + `boards/${boardId}/columns`,
      { title },
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const getColumn = async (boardId: string, columnId: string) => {
  try {
    const resp = await axios.get(
      API_URL + `boards/${boardId}/columns/${columnId}`,
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const deleteColumn = async (boardId: string, columnId: string) => {
  let result = true;
  try {
    await axios.delete(API_URL + `boards/${boardId}/columns/${columnId}`, authService.getConfig());
    return result;
  } catch (error) {
    result = false;
  }
  return result;
};

const updateColumn = async (boardId: string, columnId: string, title: string, order: number) => {
  try {
    const resp = await axios.put(
      API_URL + `boards/${boardId}/columns/${columnId}`,
      { title, order },
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const columnsService = {
  getColumns,
  createColumn,
  getColumn,
  deleteColumn,
  updateColumn,
};

export default columnsService;
