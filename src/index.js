import React from 'react';
import WebFont from 'webfontloader';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import App from './components/App/App';
import ReactModal from 'react-modal';
import './index.scss';

WebFont.load({
  google: {
    families: [
      'Chilanka: 400',
      'Roboto Mono: 400'
    ]
  }
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

ReactModal.setAppElement(document.getElementById('root'));
