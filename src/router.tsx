import React, { useEffect } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  useLocation
} from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from './store/configureStore';
import { getAccessToken, loadLocalAuth } from './slices/spotify';
import { getAuth } from './api/spotify';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from './constants/pods';
import Home from './components/Home/Home';
import SpotifyAuth from './components/Spotify/SpotifyAuth/SpotifyAuth';
import Pods from './components/Pods/Pods';
import PodLobby from './components/Pods/PodLobby/PodLobby';
import Pod from './components/Pods/Pod/Pod';
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
  const dispatch = useDispatch<AppDispatch>();
  const hasAuth = !!useSelector(getAccessToken);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!hasAuth) {
      dispatch(loadLocalAuth());
    }
  }, [hasAuth, dispatch]);

  if (!hasAuth && pathname !== '/') {
    return (
      <Button
        className={spotifyStyles.authButton}
        onClick={() => getAuth(pathname)}
      >
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

const podsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/pods',
  component: Pods
});

const podLayoutRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/pods/$podId',
  component: () => <Outlet />
});

const podLobbyRoute = createRoute({
  getParentRoute: () => podLayoutRoute,
  path: '/',
  component: PodLobby
});

const podSearchRoute = createRoute({
  getParentRoute: () => podLayoutRoute,
  path: '/search',
  component: () => <Pod view={SEARCH} />
});

const podPlayerRoute = createRoute({
  getParentRoute: () => podLayoutRoute,
  path: '/player',
  component: () => <Pod view={NOW_PLAYING} />
});

const podQueueRoute = createRoute({
  getParentRoute: () => podLayoutRoute,
  path: '/queue',
  component: () => <Pod view={PLAY_QUEUE} />
});

const podHistoryRoute = createRoute({
  getParentRoute: () => podLayoutRoute,
  path: '/history',
  component: () => <Pod view={PLAY_HISTORY} />
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  spotifyAuthRoute,
  authenticatedRoute.addChildren([
    podsRoute,
    podLayoutRoute.addChildren([
      podLobbyRoute,
      podSearchRoute,
      podPlayerRoute,
      podQueueRoute,
      podHistoryRoute
    ])
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
