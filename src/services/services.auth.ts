import axios from 'axios';
import { API_URL } from '../common/constants';

interface IErrorMessage {
  response: { data: { message: string } };
}

const singin = async (login: string, password: string) => {
  try {
    const resp = await axios.post(API_URL + 'signin', { login, password });
    const token = resp.data.token;

    if (token) {
      localStorage.setItem('login', JSON.stringify(login));
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
