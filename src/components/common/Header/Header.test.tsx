import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterTestWrapper } from '../../../test/helpers';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useNotifyStore } from '../../../stores/notifyStore';
import Header from './Header';

const HeaderWrapper = () => <Header isMinimal={false} />;

describe('Header Component', () => {
  beforeEach(() => {
    useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
    useNotifyStore.setState({ hidden: true, message: '' });
  });

  it('should render', async () => {
    render(<RouterTestWrapper component={HeaderWrapper} />);

    await waitFor(() => {
      expect(screen.getByText('Peapod')).toBeInTheDocument();
    });
  });
});
