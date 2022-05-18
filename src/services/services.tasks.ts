import axios from 'axios';
import { API_URL } from '../common/common.constants';
import { TaskInfo } from '../common/common.types';
import authService from './services.auth';
import { IResponceError } from './services.types';

const getTasks = async (boardId: string, columnId: string) => {
  try {
    const resp = await axios.get(
      API_URL + `boards/${boardId}/columns/${columnId}/tasks`,
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const createTask = async (boardId: string, columnId: string, task: TaskInfo) => {
  try {
    const resp = await axios.post(
      API_URL + `boards/${boardId}/columns/${columnId}/tasks`,
      JSON.stringify(task),
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const getTask = async (boardId: string, columnId: string, taskId: string) => {
  try {
    const resp = await axios.get(
      API_URL + `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
  let result = true;
  try {
    await axios.delete(
      API_URL + `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      authService.getConfig()
    );
    return result;
  } catch (error) {
    result = false;
  }
  return result;
};

const updateTask = async (boardId: string, columnId: string, taskId: string, task: TaskInfo) => {
  try {
    const resp = await axios.put(
      API_URL + `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      JSON.stringify(task),
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const tasksService = {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};

export default tasksService;
