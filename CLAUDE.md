# Peapod UI

Peapod is a Spotify jukebox app that connects friends and partners who want to listen to Spotify together. Each "jukebox" is a **pod** — a group of people sharing music through a synced queue/playlist. One user owns the pod (controls playback), and other members contribute to and follow along with the shared queue in real time.

This repo is the React frontend. It communicates with a backend API (default `localhost:3001`) and uses Pusher for real-time sync between pod members.

## Tech Stack

- **Framework**: React 19, TypeScript
- **Build**: Vite 6, pnpm
- **Routing**: TanStack Router (route tree in `src/router.tsx`)
- **State**: Zustand (auth, connection, sync, notifications) + TanStack React Query (server data)
- **Real-time**: Pusher.js (channel per pod, cluster us2)
- **Styling**: Tailwind CSS v4 (theme in `src/app.css`)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 (flat config), Prettier

## Project Structure

```
src/
├── api/            # Fetch-based API clients (pods, spotify, sync, tools)
├── components/     # React components organized by feature
│   ├── Home/       # Landing page
│   ├── Pods/       # Pod list, individual pod, members, queue, history, invites
│   ├── Spotify/    # Player, search, auth, devices, profile, tracks
│   └── common/     # Reusable UI (Button, Modal, Header, Icon, etc.)
├── constants/      # App constants
├── hooks/          # Custom hooks (useDebounce, useInterval, useLocalStorage, etc.)
├── queries/        # React Query hooks and query key factories
├── selectors/      # Pure selector functions for derived state
├── stores/         # Zustand stores (spotify, pods, sync, notify)
├── utils/          # Helpers (spotify token management, pusher, validation)
├── types.ts        # Shared TypeScript types
├── router.tsx      # TanStack Router route tree
├── queryClient.ts  # React Query client config
├── app.css         # Tailwind CSS entry + theme + base styles
└── index.tsx       # App entry point
```

## Route Structure

```
/                        # Home
/spotify/auth            # Spotify OAuth callback
/authenticated/          # Auth-guarded layout
  /pods                  # Pod list
  /pods/$podId           # Pod (unified: player, queue, search, history)
  /invite/$podId         # Invite link handler
```

## Commands

- `pnpm dev` — Start dev server (port 3000, proxies `/api` to `localhost:3001`)
- `pnpm build` — Production build
- `pnpm test` — Run tests once
- `pnpm test:watch` — Run tests in watch mode
- `pnpm typecheck` — TypeScript type checking
- `pnpm lint` — Run ESLint
- `pnpm format` — Format with Prettier
- `pnpm verify` — Lint + typecheck + test (full validation)

## Key Patterns

- **Components** are functional with hooks, styled with Tailwind utility classes
- **API layer** uses native Fetch; base URL from `VITE_PEAPOD_API_URL` env var
- **Auth flow**: Spotify OAuth → tokens stored in Zustand + localStorage → auto-refresh before expiry
- **Real-time sync**: Pod owner's playback state is broadcast via Pusher to all connected clients
- **Data fetching**: React Query with 30s staleTime; `useNowPlaying` and `usePod` poll every 5s
- **Pod roles**: Owner controls playback; clients see synced state via Pusher events

## Environment Variables

- `VITE_PEAPOD_API_URL` — Backend API base URL
- `VITE_PUSHER_APP_KEY` — Pusher application key
