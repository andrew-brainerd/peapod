import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../common/Button/Button';
import { ReactComponent as NewIcon } from '../../../img/add.svg';
import CreateNewButton from './CreateNewButton';

describe('CreateNewButton Component', () => {
  let props;

  beforeEach(() => {
    props = {
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <CreateNewButton {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a Button component', () => {
    const component = render();

    expect(component.find(Button)).toBeTruthy();
  });

  it('should render an icon component', () => {
    const component = render();

    expect(component.find(NewIcon)).toBeTruthy();
  });

  it('should navigate on click', () => {
    const component = render();
    const button = component.find(Button);

    button.simulate('click');

    expect(props.navTo).toHaveBeenCalled();
  });
});
