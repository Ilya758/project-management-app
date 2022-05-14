import { useState } from 'react';
// import { PATH } from '../../constants/path';
// import axios from 'axios';

export const EditProfile = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   axios.get(PATH.PROFILE());
  // }, []);

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
    } catch (error) {}
  };

  return (
    <div className="wrapper-component">
      <div className="title">Edit your profile</div>
      <form className="form" onSubmit={handerSubmit}>
        <div className="form__row">
          <div className="form__row-label">Name</div>
          <div className="form__row-input">
            <input className="form__input" type="text" value={name} onChange={handleOnChangeName} />
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
            />
          </div>
        </div>
        <div></div>
        <div className="form__row form__row-fotter">
          <input className="form__submit" type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};
