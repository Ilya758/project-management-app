import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Authentification } from './Authentification';
import App from './App';
import { store } from './store/store';
import './index.scss';
import { ButtonUp } from './components/ButtonUp/ButtonUp';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Authentification>
          <App />
        </Authentification>
        <ButtonUp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
