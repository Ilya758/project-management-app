import { Route, Routes } from 'react-router-dom';
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
          <Route path="" element={<WelcomePage />}></Route>

          <Route path="login" element={<LoginPage />}></Route>

          <Route path="main" element={<MainPage />}></Route>

          <Route path="board" element={<BoardPage />}></Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
