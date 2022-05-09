import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/store';
import './index.css';
import { ButtonUp } from './components/ButtonUp/ButtonUp';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ButtonUp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
