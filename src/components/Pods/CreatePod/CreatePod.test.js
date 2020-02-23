import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../common/Header/container';
import TextInput from '../../common/TextInput/TextInput';
import Button from '../../common/Button/Button';
import CreatePod from './CreatePod';

describe('CreatePod Component', () => {
  let props;

  beforeEach(() => {
    props = {
      isCreatingPod: false,
      createPod: jest.fn(),
      createdPod: {},
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <CreatePod {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a Header component', () => {
    const component = render();

    expect(component.find(Header)).toBeTruthy();
  });

  it('should render a TextInput component', () => {
    const component = render();

    expect(component.find(TextInput)).toBeTruthy();
  });

  describe('Create Button', () => {
    it('should render', () => {
      const component = render();

      expect(component.find(Button)).toBeTruthy();
    });

    it('should disable while creating pod', () => {
      props.isCreatingPod = true;
      const component = render();
      const button = component.find(Button);

      expect(button.props().disabled).toBeTruthy();
    });
  });
});
