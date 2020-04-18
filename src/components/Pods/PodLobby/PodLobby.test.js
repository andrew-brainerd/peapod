import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../common/Header/container';
import Button from '../../common/Button/Button';
import PodLobby from './PodLobby';

describe('PodLobby Component', () => {
  let props;

  beforeEach(() => {
    props = {
      podId: '12345',
      podMembers: [],
      getPod: jest.fn(),
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <PodLobby {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a Header component', () => {
    const component = render();

    expect(component.find(Header).exists()).toBeTruthy();
  });

  it('should render a Button component', () => {
    const component = render();

    expect(component.find(Button).exists()).toBeTruthy();
  });
});
