import Routes from './Routes';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { ButtonUp } from './components/ButtonUp/ButtonUp';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
        <ButtonUp />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
