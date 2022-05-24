import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Context } from '../../common/common.context';
import authService from '../../services/services.auth';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

const HomePage = () => {
  const [isAuthorize, setIsAuthorize] = useState(authService.isAuthorize());

  return (
    <>
      <Context.Provider value={{ isAuthorize, setIsAuthorize }}>
        <Header />
        <Outlet />
        <Footer />
      </Context.Provider>
    </>
  );
};

export default HomePage;
