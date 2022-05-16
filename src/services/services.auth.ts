import axios from 'axios';
import { API_URL } from '../constants/path';

export interface IErrorMessage {
  response: { data: { message: string } };
}
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
}

const singin = async (login: string, password: string) => {
  try {
    const resp = await axios.post(API_URL + 'signin', { login, password });
    const token = resp.data.token;

    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };

      localStorage.setItem('login', login);
      localStorage.setItem('token', token);
    }
    return token;
  } catch (error) {
    throw new Error((error as IErrorMessage).response.data.message);
  }
};

const singout = () => {
  localStorage.removeItem('login');
};

const singup = async (name: string, login: string, password: string) => {
  try {
    const response = await axios.post(API_URL + 'signup', { name, login, password });
    return !!response.data.login;
  } catch (error) {
    throw new Error((error as IErrorMessage).response.data.message);
  }
};

const isAuthorize = () => Boolean(localStorage.getItem('login'));

const authService = {
  singin,
  singout,
  singup,
  isAuthorize,
};

export default authService;
