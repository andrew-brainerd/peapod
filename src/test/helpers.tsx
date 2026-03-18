import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  createMemoryHistory,
  RouterProvider
} from '@tanstack/react-router';

interface TestWrapperOptions {
  initialPath?: string;
  routePath?: string;
}

export function createTestRouter(
  Component: React.FC,
  { initialPath = '/', routePath }: TestWrapperOptions = {}
) {
  const rootRoute = createRootRoute();

  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: routePath || initialPath,
    component: () => <Component />
  });

  // Add a catch-all route to avoid 404 warnings
  const catchAllRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$',
    component: () => null
  });

  const routeTree = rootRoute.addChildren([componentRoute, catchAllRoute]);

  const memoryHistory = createMemoryHistory({
    initialEntries: [initialPath]
  });

  return createRouter({
    routeTree,
    history: memoryHistory
  });
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0
      }
    }
  });
}

export function RouterTestWrapper({
  component: Component,
  initialPath = '/',
  routePath,
  queryClient
}: TestWrapperOptions & {
  component: React.FC;
  queryClient?: QueryClient;
}) {
  const client = queryClient || createTestQueryClient();
  const router = createTestRouter(Component, { initialPath, routePath });

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
