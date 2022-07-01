import './i18n/config';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import BoardPage from './components/BoardPage/BoardPage';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import { Authentication } from './components/Authentication/Authentication';
import MainPage from './components/MainPage/MainPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import { EditProfile } from './components/EditProfile/EditProfile';
import authService from './services/services.auth';
import { Context } from './common/common.context';

const App = () => {
  const navigate = useNavigate();
  const [isAuthorize, setIsAuthorize] = useState(authService.isAuthorize());

  useEffect(() => {
    if (isAuthorize) {
      const interval = setInterval(() => {
        if (!authService.isAuthorize()) {
          setIsAuthorize(false);
          navigate('/');
          clearInterval(interval);
        }
      }, 1000 * 2 * 60);
      return () => clearInterval(interval);
    }
  }, [isAuthorize, navigate]);

  return (
    <>
      <Context.Provider value={{ isAuthorize, setIsAuthorize }}>
        <Routes>
          <Route path="" element={<HomePage />}>
            <Route index element={<WelcomePage />}></Route>
            <Route path="authentication" element={<Authentication />}>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="registration" element={<RegistrationPage />}></Route>
            </Route>
            <Route path="main" element={<MainPage />}></Route>
            <Route path="profile" element={<EditProfile />}></Route>
            <Route path="boards/:boardId" element={<BoardPage />}></Route>
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
        </Routes>
      </Context.Provider>
    </>
  );
};

export default App;
