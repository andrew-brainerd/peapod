import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  it('should render when open', () => {
    render(
      <Modal isOpen={true} headerText="Modal Header" closeModal={vi.fn()}>
        <div>Child Component</div>
      </Modal>
    );

    expect(screen.getByText('Modal Header')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
