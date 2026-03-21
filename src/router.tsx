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
// Root layout
const RootLayout = () => (
  <div className="m-px overflow-hidden z-1">
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
      <Button className="mx-auto mt-[50px] p-5 w-[200px] [&_svg]:mx-auto [&_svg]:my-5 [&_svg]:w-[100px]" onClick={() => getAuth(pathname)}>
        <Icon name={'spotify'} title={'Spotify Logo'} />
        <div className="text-2xl m-5">Spotify Login</div>
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
