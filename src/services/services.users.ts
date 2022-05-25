import axios from 'axios';
import { API_URL } from '../common/common.constants';
import authService from './services.auth';
import { IResponceError } from './services.types';

const getUsers = async () => {
  try {
    const resp = await axios.get(API_URL + `users`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const createUsers = async (id: string) => {
  try {
    const resp = await axios.get(API_URL + `users${id}`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const usersService = {
  getUsers,
  createUsers,
};

export default usersService;
