import React from 'react';
import { shallow } from 'enzyme';
import Button from '../common/Button/Button';
import Home from './Home';

describe('Home Component', () => {
  let props;

  beforeEach(() => {
    props = {
      userId: '12345',
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <Home {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a Button component', () => {
    const component = render();

    expect(component.find(Button)).toBeTruthy();
  });
});
