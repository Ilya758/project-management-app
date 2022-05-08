import axios from 'axios';
import { API_URL } from '../common/constants';

const singin = async (login: string, password: string) => {
  let token = '';
  try {
    const resp = await axios.post(API_URL + 'signin', { login, password });
    token = resp.data.token;
  } catch (error) {
    throw new Error(`signin error!`);
  }

  if (token) {
    localStorage.setItem('login', JSON.stringify(login));
  }

  return token;
};

const singout = () => {
  localStorage.removeItem('login');
};

const singup = (name: string, login: string, password: string) => {
  return axios.post(API_URL + 'signup', { name, login, password }).then((response) => {
    return !!response.data.login;
  });
};

const authService = {
  singin,
  singout,
  singup,
};

export default authService;
