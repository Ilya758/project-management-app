import { API_URL } from '../common/common.constants';

export const PATH = {
  USERS: `${API_URL}users`,
  UPDATE_USER: (id: string) => `${API_URL}users/${id}`,
  DELETE_USER: (id: string) => `${API_URL}users/${id}`,
  BOARDS: `${API_URL}boards`,
  DELETE_BOARD: (id: string) => `${API_URL}boards/${id}`,
};
