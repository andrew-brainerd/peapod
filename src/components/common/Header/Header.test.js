import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {
  let props;

  beforeEach(() => {
    props = {
      isMinimal: false,
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <Header {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should add minimal style', () => {
    props.isMinimal = true;
    const component = render();

    const className = component.props().className.trim();

    expect(className).toEqual('header minimal');
  });
});
