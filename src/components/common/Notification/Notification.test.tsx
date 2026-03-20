import React from 'react';
import { render, screen } from '@testing-library/react';
import { useNotifyStore } from '../../../stores/notifyStore';
import Notification from './Notification';

describe('Notification Component', () => {
  it('should render', () => {
    useNotifyStore.setState({ hidden: false, message: 'Test message' });

    render(<Notification />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
