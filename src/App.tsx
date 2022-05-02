import { Navigate, Route, Routes } from 'react-router-dom';
import BoardPage from './components/BoardPage/BoardPage';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import WelcomePage from './components/WelcomePage/WelcomePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route index element={<WelcomePage />}></Route>

          <Route path="login" element={<LoginPage />}></Route>

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
