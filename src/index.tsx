import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { queryClient } from './queryClient';
import ReactModal from 'react-modal';
import './index.scss';

console.log(`%cPeapod App v${APP_VERSION}`, 'color: rgba(139, 196, 72, 1); font-size: 20px;');

const container = document.getElementById('root')!;

ReactModal.setAppElement(container);

const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
