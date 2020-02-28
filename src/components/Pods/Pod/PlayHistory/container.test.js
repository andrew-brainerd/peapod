import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Container from './container';
import PlayHistory from './PlayHistory';

describe('PlayHistory Container', () => {
  let store, props, wrapper, container, component;

  const render = () => mount(
    <Provider store={store}>
      <Container {...props} />
    </Provider>
  );

  beforeEach(() => {
    store = configureStore([thunk])();

    props = {
      height: 100,
      currentTrack: {},
      history: []
    };

    wrapper = render();
    container = wrapper.find(Container);
    component = container.find(PlayHistory);
  });

  it('should render', () => {
    expect(container).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
