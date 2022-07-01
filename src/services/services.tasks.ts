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
      {
        title: task.title,
        description: task.description,
        userId: task.userId,
      },
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

const updateTask = async (
  boardId: string,
  newColumnId: string,
  task: TaskInfo,
  columnId?: string
) => {
  try {
    const resp = await axios.put(
      API_URL + `boards/${boardId}/columns/${columnId || newColumnId}/tasks/${task.id}`,
      {
        title: task.title,
        order: task.order,
        description: task.description,
        userId: task.userId,
        boardId: boardId,
        columnId: newColumnId,
      },
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
