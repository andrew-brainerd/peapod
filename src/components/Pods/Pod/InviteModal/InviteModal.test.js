import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Button from '../../../common/Button/Button';
import InviteModal from './InviteModal';

describe('InviteModal Component', () => {
  let props;

  beforeEach(() => {
    props = {
      isOpen: true,
      podId: '12345',
      podName: 'Pod',
      closeModal: jest.fn(),
      sendInvitation: jest.fn()
    };
  });

  const render = () => shallow(
    <InviteModal {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a Modal component', () => {
    const component = render();

    expect(component.find(Modal)).toBeTruthy();
  });

  it('should render a TextInput component', () => {
    const component = render();
    const modal = component.find(Modal);

    expect(modal.find(TextInput)).toBeTruthy();
  });

  it('should render a Button component', () => {
    const component = render();
    const modal = component.find(Modal);

    expect(modal.find(Button)).toBeTruthy();
  });
});
