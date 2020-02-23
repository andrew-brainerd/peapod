import React from 'react';
import { shallow } from 'enzyme';
import noop from '../../../utils/noop';
import Button from './Button';

describe('Button Component', () => {
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn()
    };
  });

  const render = () => shallow(
    <Button {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should add disabled style', () => {
    props.disabled = true;
    const component = render();

    const className = component.props().className.trim();

    expect(className).toEqual('button disabled');
  });

  describe('onClick', () => {
    it('should call onClick', () => {
      const component = render();

      component.simulate('click');

      expect(props.onClick).toHaveBeenCalled();
    });

    it('should call noop when disabled', () => {
      props.disabled = true;
      const component = render();

      component.simulate('click');

      expect(component.props().onClick).toEqual(noop);
    });
  });
});
