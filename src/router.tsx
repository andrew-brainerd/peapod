import React, { useEffect } from 'react';
import { createRootRoute, createRoute, createRouter, Outlet, useLocation } from '@tanstack/react-router';
import { useSpotifyStore } from './stores/spotifyStore';
import { getAuth } from './api/spotify';
import Home from './components/Home/Home';
import SpotifyAuth from './components/Spotify/SpotifyAuth/SpotifyAuth';
import Pods from './components/Pods/Pods';
import Pod from './components/Pods/Pod/Pod';
import Invite from './components/Pods/Invite/Invite';
import Button from './components/common/Button/Button';
import Icon from './components/common/Icon/Icon';
import styles from './components/App/App.module.scss';
import spotifyStyles from './components/Spotify/Spotify.module.scss';

// Root layout
const RootLayout = () => (
  <div className={styles.peapod}>
    <Outlet />
  </div>
);

// Auth layout
const AuthenticatedLayout = () => {
  const hasAuth = !!useSpotifyStore((state) => state.accessToken);
  const loadLocalAuth = useSpotifyStore((state) => state.loadLocalAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!hasAuth) {
      loadLocalAuth();
    }
  }, [hasAuth, loadLocalAuth]);

  if (!hasAuth && pathname !== '/') {
    return (
      <Button className={spotifyStyles.authButton} onClick={() => getAuth(pathname)}>
        <Icon name={'spotify'} title={'Spotify Logo'} />
        <div className={spotifyStyles.authButtonText}>Spotify Login</div>
      </Button>
    );
  }

  return <Outlet />;
};

// Route definitions
const rootRoute = createRootRoute({
  component: RootLayout
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
});

const spotifyAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/spotify/auth',
  validateSearch: (search: Record<string, unknown>) => ({
    access_token: search.access_token as string,
    refresh_token: search.refresh_token as string,
    expires_in: search.expires_in as string
  }),
  component: SpotifyAuth
});

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: AuthenticatedLayout
});

const inviteRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/invite/$podId',
  component: Invite
});

const podsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/pods',
  component: Pods
});

const podRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/pods/$podId',
  component: Pod
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  spotifyAuthRoute,
  authenticatedRoute.addChildren([
    inviteRoute,
    podsRoute,
    podRoute
  ])
]);

// Router
export const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
