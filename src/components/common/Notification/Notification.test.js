import React from 'react';
import { shallow } from 'enzyme';
import Notification from './Notification';

describe('Notification Component', () => {
  let props;

  beforeEach(() => {
    props = {
      isHidden: false,
      message: '',
      closeNotification: jest.fn()
    };
  });

  const render = () => shallow(
    <Notification {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should add hidden style', () => {
    props.isHidden = true;
    const component = render();

    const className = component.props().className.trim();

    expect(className).toEqual('notification hidden');
  });
});
