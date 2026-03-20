import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterTestWrapper } from '../../../test/helpers';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import CreateNewButton from './CreateNewButton';

describe('CreateNewButton Component', () => {
  beforeEach(() => {
    useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
  });

  it('should render', async () => {
    render(<RouterTestWrapper component={CreateNewButton} />);

    await waitFor(() => {
      expect(screen.getByTitle('Create New Pod')).toBeInTheDocument();
    });
  });
});
