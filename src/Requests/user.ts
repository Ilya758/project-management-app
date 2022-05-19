import axios from 'axios';
import { PATH } from '../constants/path';
import { IUser } from '../models/users';

export const editUser = () =>
  axios.get<IUser[]>(PATH.USERS).then((response) => {
    const login = localStorage.getItem('login');
    const user = response.data.find((elem) => elem.login === login);
    console.log(response.data);
    return user;
  });
