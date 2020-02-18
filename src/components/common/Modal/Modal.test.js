import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal Component', () => {
  let props;
  let children = <div>Child Component</div>;

  beforeEach(() => {
    props = {
      className: '',
      isOpen: true,
      children,
      contentClassName: '',
      headerText: 'Modal Header',
      onOpen: jest.fn(),
      closeModal: jest.fn()
    };
  });

  const render = () => shallow(
    <Modal {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });
});
