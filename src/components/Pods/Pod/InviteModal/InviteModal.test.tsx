import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../../../test/helpers';
import InviteModal from './InviteModal';

describe('InviteModal Component', () => {
  it('should render when open', () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <InviteModal isOpen={true} podId="12345" podName="Pod" closeModal={vi.fn()} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Invite')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
  });
});
