import { Navigate, Route, Routes } from 'react-router-dom';
import BoardPage from './components/BoardPage/BoardPage';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import { Authentication } from './components/Authentication/Authentication';
import MainPage from './components/MainPage/MainPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { Login } from './components/Authentication/Login';
import { Registration } from './components/Authentication/Registration';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route index element={<WelcomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>

          <Route path="authentication" element={<Authentication />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="registration" element={<Registration />}></Route>
          </Route>

          <Route path="main" element={<MainPage />}></Route>
          <Route path="board" element={<BoardPage />}></Route>
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
