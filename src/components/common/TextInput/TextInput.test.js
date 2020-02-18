import React from 'react';
import { shallow } from 'enzyme';
import noop from '../../../utils/noop';
import TextInput from './TextInput';

describe('TextInput Component', () => {
  let props;

  beforeEach(() => {
    props = {
      placeholder: 'Placeholder',
      value: 'input value',
      inputClassName: '',
      error: null,
      autoFocus: false,
      onChange: jest.fn(),
      onPressEnter: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
  });

  const render = () => shallow(
    <TextInput {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should call noop when onFocus not provided', () => {
    props.onFocus = undefined;
    const component = render().find('input');
    
    expect(component.props().onFocus).toEqual(noop);
  });
  
  it('should call noop when onBlur not provided', () => {
    props.onBlur = undefined;
    const component = render().find('input');
    
    expect(component.props().onBlur).toEqual(noop);
  });

  it('should set the default placeholder', () => {
    props.placeholder = undefined;
    const component = render().find('input');

    expect(component.props().placeholder).toEqual('')
  });

  describe('set the default input value', () => {
    it('should set input value to given value', () => {
      const component = render().find('input');

      expect(component.props().value).toEqual('input value');
    });

    it('should set input value to default value', () => {
      props.value = null;
      const component = render().find('input');

      expect(component.props().value).toEqual('');
    });
  });

  it('should show input error', () => {
    props.error = 'input error';
    const component = render();

    expect(component.find('.inputError')).toBeTruthy();
  });
});
