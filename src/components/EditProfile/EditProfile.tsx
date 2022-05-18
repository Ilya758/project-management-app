import { useState, useEffect } from 'react';
import { PATH } from '../../constants/path';
import axios from 'axios';
import { IUser } from '../../models/users';
import { editUser } from '../../Requests/user';
import { IErrorMessage } from '../../services/services.auth';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import '../Authentication/Authentication.scss';

export const EditProfile = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<IUser>({} as IUser);
  const [error, setError] = useState('');

  useEffect(() => {
    editUser().then((user) => {
      if (user) {
        setUser(user);
        setName(user.name);
        setLogin(user.login);
      }
    });
  }, []);

  const handleOnChangeName = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.currentTarget.value as string);
  };

  const handleOnChangeLogin = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin(e.currentTarget.value as string);
  };
  const handleOnChangePassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="wrapper-component center">
      <Container component="div" maxWidth="xs">
        <Typography component="h3" variant="h5">
          Edit Your Profile
        </Typography>
        <Box component="form" onSubmit={handerSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Create Your Name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleOnChangeName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Create Your Login"
            autoComplete="login"
            autoFocus
            value={login}
            onChange={handleOnChangeLogin}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="Create Your Password"
            value={password}
            onChange={handleOnChangePassword}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
    </div>
  );
};
