import { useState, useEffect } from 'react';
import { PATH } from '../../constants/path';
import axios from 'axios';
import { IUser } from '../../models/users';
import { IErrorMessage } from '../../services/services.auth';

export const EditProfile = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<IUser>({} as IUser);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<IUser[]>(PATH.USERS).then((response) => {
      const login = localStorage.getItem('login');
      const user = response.data.find((elem) => elem.login === login);
      if (user) {
        setUser(user);
        setName(user.name);
        setLogin(user.login);
      }
    });
  }, []);

  const handleOnChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value as string);
  };

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value as string);
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value as string);
  };

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(PATH.UPDATE_USER(user.id), { login, name, password });
    } catch (error) {
      setError((error as IErrorMessage).response.data.message);
    }
  };

  return (
    <div className="wrapper-component">
      <div className="title">Edit your profile</div>
      <form className="form" onSubmit={handerSubmit}>
        <div className="form__row">
          <div className="form__row-label">Name</div>
          <div className="form__row-input">
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={handleOnChangeName}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__row-label">Login</div>
          <div className="form__row-input">
            <input
              className="form__input"
              type="text"
              value={login}
              onChange={handleOnChangeLogin}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form__row">
          <div className="form__row-label">Password</div>
          <div className="form__row-input">
            <input
              className="form__input"
              type="password"
              value={password}
              onChange={handleOnChangePassword}
              autoComplete="off"
            />
          </div>
        </div>
        <div></div>
        <div className="form__row form__row-fotter">
          <p>{error}</p>
          <input className="form__submit" type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};
