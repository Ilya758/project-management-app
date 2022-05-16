import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../common/common.constants';
import { IResponce } from './services.types';

const singin = async (login: string, password: string) => {
  try {
    const resp = await axios.post(API_URL + 'signin', { login, password });
    const token = resp.data.token;

    if (token) {
      localStorage.setItem('login', JSON.stringify(login));
      document.cookie = `token=${token}; max-age=3600`;
    }
    return token;
  } catch (error) {
    throw new Error((error as IResponce).response.data.message);
  }
};

const singout = () => {
  localStorage.removeItem('login');
  document.cookie = 'token=;max-age=-1';
};

const singup = async (name: string, login: string, password: string) => {
  try {
    const response = await axios.post(API_URL + 'signup', { name, login, password });
    return !!response.data.login;
  } catch (error) {
    throw new Error((error as IResponce).response.data.message);
  }
};

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const getToken = () => getCookie('token');

const getConfig: () => AxiosRequestConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

const isAuthorize = () => Boolean(getToken());

const authService = {
  singin,
  singout,
  singup,
  isAuthorize,
  getConfig,
};

export default authService;
