import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterTestWrapper } from '../../test/helpers';
import { useSpotifyStore } from '../../stores/spotifyStore';
import Home from './Home';

describe('Home Component', () => {
  beforeEach(() => {
    useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
  });

  it('should render', async () => {
    render(<RouterTestWrapper component={Home} />);

    await waitFor(() => {
      expect(screen.getByText('Peapod')).toBeInTheDocument();
    });
  });

  it('should render the logo', async () => {
    render(<RouterTestWrapper component={Home} />);

    await waitFor(() => {
      expect(screen.getByAltText('Peapod Logo')).toBeInTheDocument();
    });
  });
});
