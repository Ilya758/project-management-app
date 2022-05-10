import { Navigate, Route, Routes } from 'react-router-dom';
import BoardPage from './components/BoardPage/BoardPage';
import HomePage from './components/HomePage/HomePage';
import MainPage from './components/MainPage/MainPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import LoginPage from './components/LoginPage/LoginPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route index element={<WelcomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="registrations" element={<RegistrationPage />}></Route>
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
