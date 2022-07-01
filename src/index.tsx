import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Authentification } from './Authentification';
import App from './App';
import { store } from './store/store';
import './index.scss';
import { ButtonUp } from './components/ButtonUp/ButtonUp';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Authentification>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </Authentification>
        <ButtonUp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
