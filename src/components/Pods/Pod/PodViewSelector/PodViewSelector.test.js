import React from 'react';
import { shallow } from 'enzyme';
import { SEARCH, NOW_PLAYING } from '../../../../constants/pods';
import { ReactComponent as MenuIcon } from '../../../../img/hamburger.svg';
import PodViewSelector from './PodViewSelector';

describe('PodViewSelector Component', () => {
  let props;

  beforeEach(() => {
    props = {
      className: '',
      podId: '12345',
      selectedView: SEARCH,
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <PodViewSelector {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render an icon component', () => {
    const component = render();

    expect(component.find(MenuIcon)).toBeTruthy();
  });
});
