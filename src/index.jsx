import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import App from './components/App/App';
import ReactModal from 'react-modal';
import './index.scss';

console.log(
  `%cPeapod App v${APP_VERSION}`,
  'color: rgba(139, 196, 72, 1); font-size: 20px;'
);

const store = configureStore();
const container = document.getElementById('root');

ReactModal.setAppElement(container);

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
