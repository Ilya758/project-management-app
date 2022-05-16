export const API_URL = 'https://powerful-inlet-80553.herokuapp.com/';

export const PATH = {
  USERS: `${API_URL}users`,
  UPDATE_USER: (id: string) => `${API_URL}users/${id}`,
  BOARDS: `${API_URL}boards`,
  DELETE_BOARD: (id: string) => `${API_URL}boards/${id}`,
};
