import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { history } from '../../store/configureStore';
import { Provider } from 'react-redux';
import App from './App';

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore([thunk])();
  });

  const render = () => shallow(
    <Provider store={store}>
      <App history={history} />
    </Provider>
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });
});
