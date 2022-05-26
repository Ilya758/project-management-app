import axios from 'axios';
import { API_URL } from '../common/common.constants';
import { UserInfo } from '../common/common.types';
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

const deleteUser = async (userId: string) => {
  try {
    const resp = await axios.delete(API_URL + `users/${userId}`, authService.getConfig());
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const updateUser = async (user: UserInfo, password: string) => {
  try {
    const resp = await axios.put(
      API_URL + `users/${user.id}`,
      { login: user.login, name: user.name, password: password },
      authService.getConfig()
    );
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const usersService = {
  getUsers,
  updateUser,
  deleteUser,
};

export default usersService;
