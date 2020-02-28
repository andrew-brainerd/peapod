/* Container Test */

import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Container from './container';
import Component from './Component';

describe('Component Container', () => {
  let store;

  beforeEach(() => {
    store = configureStore([thunk])();
  });

  const render = () => mount(
    <Provider store={store}>
      <Container />
    </Provider>
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
