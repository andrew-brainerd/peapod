import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import Home from './components/Home/Home';
import './index.scss';

WebFont.load({
  google: {
    families: [
      'Chilanka: 400',
      'Roboto Mono: 400'
    ]
  }
});

ReactDOM.render(<Home />, document.getElementById('root'));
