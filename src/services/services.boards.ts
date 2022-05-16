import axios from 'axios';
import { API_URL } from '../common/common.constants';
import authService from './services.auth';
import { IResponce } from './services.types';

const getBoard = async (id: string) => {
  try {
    const resp = await axios.get(API_URL + `boards/${id}`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponce).response.data.message);
  }
};

const boardsService = {
  getBoard,
};

export default boardsService;
