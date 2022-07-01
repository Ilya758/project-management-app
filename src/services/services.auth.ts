import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../common/common.constants';
import { IResponceError } from './services.types';

export interface IErrorMessage {
  response: { data: { message: string } };
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

const singin = async (login: string, password: string) => {
  try {
    const resp = await axios.post(API_URL + 'signin', { login, password });
    const token = resp.data.token;

    if (token) {
      localStorage.setItem('login', login);
      localStorage.setItem('token', token);
      document.cookie = `token=${token}; max-age=60*60*24`;
    }
    return token;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
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
    throw new Error((error as IResponceError).response.data.message);
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
  getToken,
};

export default authService;
