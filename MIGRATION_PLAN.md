# Peapod Modernization Plan

## Overview

Migrate the Peapod React app from a CRA 3 / React 16 / Redux boilerplate stack to a modern Vite / React 19 / Redux Toolkit stack. The app is a Spotify-powered group listening platform with real-time sync via Pusher.

**Current stats:** ~119 JS source files, 23 container files, 5 action modules, 5 reducer modules, 5 selector modules, 42 SCSS files, 20 test files.

---

## Phase 1: Scaffold Vite + Swap Build Tooling

**Goal:** Replace Create React App with Vite. No functional changes.

### Steps

1. Create `vite.config.js` at project root:
   - Plugin: `@vitejs/plugin-react`
   - Configure `resolve.alias` if needed (e.g. `src/` → `@/`)
   - Enable CSS modules for `.module.scss` files (works by default)

2. Install new dev dependencies:
   ```
   pnpm add -D vite @vitejs/plugin-react
   ```

3. Remove CRA dependencies:
   ```
   pnpm remove react-scripts
   ```

4. Move `public/index.html` → `index.html` (project root, Vite convention):
   - Replace `%PUBLIC_URL%` references with `/`
   - Add `<script type="module" src="/src/index.jsx"></script>` before `</body>`
   - Remove the `<noscript>` CRA boilerplate

5. Rename entry point `src/index.js` → `src/index.jsx`

6. Update `package.json` scripts:
   ```json
   {
     "start": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```

7. Replace `process.env.REACT_APP_*` with `import.meta.env.VITE_*` across all files:
   - `REACT_APP_PEAPOD_API_URL` → `VITE_PEAPOD_API_URL`
   - `REACT_APP_PUSHER_APP_KEY` → `VITE_PUSHER_APP_KEY`
   - Update `.env` files accordingly

8. Remove `react-scripts` Jest config from `package.json` (the `jest` and `eslintConfig` keys) — testing is handled in Phase 5.

9. Rename all `.js` files containing JSX to `.jsx` (Vite requires explicit JSX extensions).

10. Update `static.json` if still deploying to Heroku, or replace with a Vite-compatible deployment config.

### Files touched
- New: `vite.config.js`
- Modified: `index.html`, `src/index.jsx`, `package.json`, all env references, all `.js` → `.jsx` renames
- Deleted: none (CRA config is inside `react-scripts`)

### Verification
- `pnpm start` launches dev server
- App renders and routes work
- Spotify auth flow completes
- SCSS modules load correctly

---

## Phase 2: Swap node-sass → sass

**Goal:** Replace the deprecated `node-sass` with the maintained `sass` (Dart Sass) package.

### Steps

1. Swap packages:
   ```
   pnpm remove node-sass
   pnpm add -D sass
   ```

2. Fix any Dart Sass incompatibilities in the 42 SCSS files. Common issues:
   - `/` for division → use `math.div()` or `calc()`
   - `@import` → `@use` / `@forward` (optional, can defer)

3. Verify all component styles render correctly.

### Files touched
- `package.json`
- Potentially some `.scss` files if division syntax is used

### Verification
- App renders with correct styles
- No SCSS compilation warnings

---

## Phase 3: Upgrade React 16 → 19

**Goal:** Upgrade React and remove compatibility layers.

### Steps

1. Upgrade core packages:
   ```
   pnpm add react@latest react-dom@latest
   ```

2. Replace `ReactDOM.render` with `createRoot` API in `src/index.jsx`:
   ```jsx
   import { createRoot } from 'react-dom/client';
   const root = createRoot(document.getElementById('root'));
   root.render(
     <Provider store={store}>
       <App history={history} />
     </Provider>
   );
   ```

3. Remove `prop-types` usage across all components (optional — can defer, but React 19 no longer checks them).

4. Remove `webfontloader` dependency — load fonts via CSS `@font-face` or Google Fonts `<link>` in `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Roboto+Mono&display=swap" rel="stylesheet">
   ```

5. Replace `react-sizes` (unmaintained) with a custom `useMediaQuery` hook or CSS-only responsive approach:
   - Only 2 containers use it (`Pods`, `Pod`) for a `height` prop
   - Replace with `window.innerHeight` in a small hook or CSS `vh` units

6. Upgrade `react-modal` to latest (already supports React 18/19).

7. Remove the `version` import from `package.json` in `src/index.jsx` — Vite doesn't support direct JSON imports from package.json by default. Use `import.meta.env` or a Vite define config instead.

### Files touched
- `src/index.jsx`
- `package.json`
- `index.html` (font link)
- Components using `react-sizes` (2 containers)
- All files importing `prop-types` (optional cleanup)

### Verification
- App boots without console errors
- Fonts load correctly
- Responsive behavior preserved
- Modal renders properly

---

## Phase 4: Replace Redux with Redux Toolkit (RTK)

**Goal:** Eliminate boilerplate. Replace hand-written actions/reducers/selectors with RTK slices. Replace manual fetch calls with RTK Query.

This is the largest phase — do it slice by slice.

### 4a: Install RTK + Configure Store

1. Install:
   ```
   pnpm add @reduxjs/toolkit
   pnpm remove redux redux-thunk redux-devtools-extension reselect
   ```

2. Replace `src/store/configureStore.js` with RTK's `configureStore`:
   ```js
   import { configureStore } from '@reduxjs/toolkit';
   // DevTools and thunk middleware are included automatically
   ```

3. Remove `connected-react-router` middleware from the store (router slice removed in Phase 6).

### 4b: Migrate `notify` Slice (simplest, start here)

**Current files:**
- `src/actions/notify.js`
- `src/reducers/notify.js`

1. Create `src/slices/notify.js` using `createSlice`:
   ```js
   import { createSlice } from '@reduxjs/toolkit';
   const notifySlice = createSlice({
     name: 'notify',
     initialState: { message: '', isVisible: false },
     reducers: {
       showNotification(state, action) { ... },
       hideNotification(state) { ... }
     }
   });
   ```

2. Delete `src/actions/notify.js` and `src/reducers/notify.js`.

3. Update imports in consuming components.

### 4c: Migrate `sync` Slice

**Current files:**
- `src/actions/sync.js`
- `src/reducers/sync.js`
- `src/selectors/sync.js`

1. Create `src/slices/sync.js` — includes Pusher integration as a thunk via `createAsyncThunk`.
2. Delete old action/reducer/selector files.

### 4d: Migrate `pods` Slice

**Current files:**
- `src/actions/pods.js`
- `src/reducers/pods.js`
- `src/selectors/pods.js`

1. Create `src/slices/pods.js`.
2. Convert all pod API calls in `src/api/pods.js` to either:
   - `createAsyncThunk` actions, or
   - RTK Query endpoints (preferred — see 4f)
3. Replace ramda-based selectors with plain functions using optional chaining:
   ```js
   // Before (ramda)
   export const getCurrentPod = path(['pods', 'currentPod']);
   export const getCurrentPodId = compose(prop('_id'), getCurrentPod);
   // After
   export const getCurrentPod = state => state.pods.currentPod;
   export const getCurrentPodId = state => state.pods.currentPod?._id;
   ```
4. Delete old files.

### 4e: Migrate `spotify` Slice

**Current files:**
- `src/actions/spotify.js`
- `src/reducers/spotify.js`
- `src/selectors/spotify.js`
- `src/selectors/player.js`

1. Create `src/slices/spotify.js`.
2. Same approach — convert thunks, simplify selectors.
3. Player selectors can stay as standalone functions or merge into the slice file.

### 4f: Add RTK Query API Layer (optional but recommended)

1. Create `src/services/api.js` using `createApi` + `fetchBaseQuery`:
   ```js
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
   export const peapodApi = createApi({
     baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PEAPOD_API_URL }),
     endpoints: (builder) => ({
       getPods: builder.query({ query: (userId) => `/api/pods?userId=${userId}` }),
       getPod: builder.query({ query: (podId) => `/api/pods/${podId}` }),
       createPod: builder.mutation({ query: (body) => ({ url: '/api/pods', method: 'POST', body }) }),
       // ... all endpoints from src/api/pods.js and src/api/spotify.js
     }),
   });
   ```

2. This eliminates:
   - All files in `src/api/` (4 files)
   - All loading/error state in reducers (RTK Query manages this)
   - Manual `fetch` + `handleResponse` boilerplate

3. Components use generated hooks: `useGetPodsQuery()`, `useCreatePodMutation()`, etc.

### Files deleted after Phase 4
- `src/actions/` (entire directory — 5 files)
- `src/reducers/` (entire directory — 6 files)
- `src/selectors/` (entire directory — 5 files)
- `src/api/` (entire directory — 4 files, if using RTK Query)
- `src/store/configureStore.js` (replaced)

### Files created
- `src/store.js` (single RTK configureStore)
- `src/slices/notify.js`
- `src/slices/sync.js`
- `src/slices/pods.js`
- `src/slices/spotify.js`
- `src/services/api.js` (if using RTK Query)

### Verification (after each sub-phase)
- Affected feature works end-to-end
- Redux DevTools shows correct state shape
- No regressions in other features

---

## Phase 5: Replace Enzyme with Vitest + React Testing Library

**Goal:** Modern test infrastructure that supports React 19.

### Steps

1. Install test dependencies:
   ```
   pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
   pnpm remove enzyme enzyme-adapter-react-16 redux-mock-store
   ```

2. Add Vitest config to `vite.config.js`:
   ```js
   test: {
     globals: true,
     environment: 'jsdom',
     setupFiles: './src/setupTests.js',
     css: { modules: { classNameStrategy: 'non-scoped' } }
   }
   ```

3. Update `package.json` scripts:
   ```json
   {
     "test": "vitest run",
     "test:watch": "vitest",
     "coverage": "vitest run --coverage"
   }
   ```

4. Replace `src/setupTests.js`:
   ```js
   import '@testing-library/jest-dom';
   ```

5. Rewrite the 20 test files from Enzyme `shallow()` to RTL `render()` + queries:
   ```jsx
   // Before
   const wrapper = shallow(<PageTitle text="Hello" />);
   expect(wrapper).toBeTruthy();

   // After
   render(<PageTitle text="Hello" />);
   expect(screen.getByText('Hello')).toBeInTheDocument();
   ```

6. Delete `__mocks__/cssModuleMock.js` (Vitest handles CSS modules natively with config above).

7. For components connected to Redux, wrap with a test `<Provider>` using a real store or RTK's `setupApiStore` helper instead of `redux-mock-store`.

### Files touched
- `vite.config.js`
- `package.json`
- `src/setupTests.js`
- All 20 `.test.js` files
- Deleted: `__mocks__/cssModuleMock.js`

### Verification
- `pnpm test` passes all rewritten tests
- `pnpm run coverage` produces report

---

## Phase 6: Upgrade React Router v5 → v7

**Goal:** Remove `connected-react-router`, use modern data router.

### Steps

1. Upgrade:
   ```
   pnpm add react-router react-router-dom@latest
   pnpm remove connected-react-router history
   ```

2. Replace `ConnectedRouter` in `App.jsx` with `createBrowserRouter` + `RouterProvider`:
   ```jsx
   import { createBrowserRouter, RouterProvider } from 'react-router-dom';

   const router = createBrowserRouter([
     { path: '/', element: <Home /> },
     { path: '/spotify/auth', element: <SpotifyAuth /> },
     { path: '/pods', element: <Spotify><Pods /></Spotify> },
     { path: '/pods/:podId', element: <Spotify><PodLobby /></Spotify> },
     { path: '/pods/:podId/search', element: <Spotify><Pod view={SEARCH} /></Spotify> },
     { path: '/pods/:podId/player', element: <Spotify><Pod view={NOW_PLAYING} /></Spotify> },
     { path: '/pods/:podId/queue', element: <Spotify><Pod view={PLAY_QUEUE} /></Spotify> },
     { path: '/pods/:podId/history', element: <Spotify><Pod view={PLAY_HISTORY} /></Spotify> },
   ]);

   const App = () => <RouterProvider router={router} />;
   ```

3. Replace all `navTo` action dispatches with React Router's `useNavigate` hook:
   ```js
   // Before (Redux action)
   dispatch(navTo('/pods'));
   // After
   const navigate = useNavigate();
   navigate('/pods');
   ```

4. Replace routing selectors (`getPathname`, `getPodId`, etc.) with React Router hooks:
   ```js
   // Before
   const pathname = useSelector(getPathname);
   const podId = useSelector(getPodId);
   // After
   const { pathname } = useLocation();
   const { podId } = useParams();
   ```

5. Delete:
   - `src/actions/routing.js`
   - `src/selectors/routing.js`
   - Router reducer from root reducer
   - `history` export from store

6. Remove `history` prop from `<App>` in `src/index.jsx`.

### Files touched
- `src/components/App/App.jsx` (major rewrite)
- `src/index.jsx`
- `src/store.js` (remove router reducer/middleware)
- All components using `navTo` or routing selectors
- `src/constants/routes.js` (minor updates)

### Verification
- All routes resolve correctly
- Browser back/forward work
- Pod ID extracted correctly from URL params
- Navigation from all buttons/links works

---

## Phase 7: Delete Container Files + Use Hooks Directly

**Goal:** Remove the 23 container files. Components use `useSelector`/`useDispatch` directly.

### Steps

1. For each container file:
   - Move `mapStateToProps` logic into the component as `useSelector` calls
   - Move `mapDispatchToProps` logic into the component as `useDispatch` calls
   - Delete the container file
   - Update all imports to point at the component directly

2. Example migration:
   ```jsx
   // Before: Home/container.js
   const mapStateToProps = state => ({
     userId: getProfileId(state)
   });
   const mapDispatchToProps = dispatch => ({
     navTo: path => dispatch(navTo(path))
   });
   export default connect(mapStateToProps, mapDispatchToProps)(Home);

   // After: Home/Home.jsx
   const Home = () => {
     const userId = useSelector(getProfileId);
     const navigate = useNavigate();
     // ...
   };
   ```

3. Remove all `connect` imports from `react-redux`.

4. Remove `ramda`'s `compose` used for HOC chaining (only in Pods containers with `react-sizes`, which was already removed in Phase 3).

### Files deleted
- All 23 `container.js` files

### Verification
- Each component renders with correct data
- Actions dispatch correctly
- No prop-drilling regressions

---

## Phase 8: Replace moment.js + ramda

**Goal:** Remove heavy utility libraries.

### 8a: Replace moment.js (3 files)

1. **`src/utils/spotify.js`** — token expiry:
   ```js
   // Before
   moment().add(expiresIn, 'seconds').toString()
   // After
   new Date(Date.now() + expiresIn * 1000).toISOString()
   ```

2. **`src/hooks/usePollingEffect.js`** — interval tracking:
   ```js
   // Before
   moment.duration(currentMoment.diff(lastUpdateTime)).asMilliseconds()
   // After
   Date.now() - lastUpdateTime
   ```

3. **`src/components/Spotify/Player/TrackProgress/TrackProgress.jsx`** — duration formatting:
   ```js
   // Use a small helper function:
   const formatMs = (ms) => {
     const s = Math.floor(ms / 1000) % 60;
     const m = Math.floor(ms / 60000) % 60;
     const h = Math.floor(ms / 3600000);
     return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
                   : `${m}:${String(s).padStart(2,'0')}`;
   };
   ```

4. Remove moment:
   ```
   pnpm remove moment
   ```

### 8b: Replace ramda

After Phases 4, 6, and 7, most ramda usage is already gone (selectors, routing, containers). Remaining usage:

| Usage | Replacement |
|---|---|
| `path(['a','b'])` | `state => state.a?.b` |
| `prop('x')` | `obj => obj?.x` |
| `propOr([], 'x')` | `obj => obj?.x ?? []` |
| `pathOr([], ['a','b'])` | `state => state.a?.b ?? []` |
| `compose(f, g)` | `(x) => f(g(x))` or just inline |
| `isEmpty(x)` | `x == null \|\| Object.keys(x).length === 0` or just `!x?.length` |
| `keys(x)` | `Object.keys(x)` |
| `values(x)` | `Object.values(x)` |
| `reverse(x)` | `[...x].reverse()` |
| `uniqBy(fn, arr)` | `[...new Map(arr.map(i => [fn(i), i])).values()]` |
| `always(undefined)` | `() => {}` |

Remove ramda:
```
pnpm remove ramda
```

### Files touched
- 3 files for moment
- ~15 files for remaining ramda usage
- `package.json`

### Verification
- Token expiry still validates correctly
- Polling still works at correct intervals
- Track progress displays correctly
- All selectors return correct values

---

## Phase 9: Modernize Linting

**Goal:** Replace deprecated ESLint setup.

### Steps

1. Upgrade ESLint and install modern plugins:
   ```
   pnpm add -D eslint@latest eslint-plugin-react eslint-plugin-react-hooks @eslint/js
   pnpm remove babel-eslint eslint-config-standard eslint-plugin-standard eslint-plugin-node eslint-plugin-promise eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y
   ```

2. Replace `.eslintrc` with `eslint.config.js` (flat config):
   ```js
   import js from '@eslint/js';
   import react from 'eslint-plugin-react';
   import reactHooks from 'eslint-plugin-react-hooks';

   export default [
     js.configs.recommended,
     {
       plugins: { react, 'react-hooks': reactHooks },
       rules: {
         'semi': ['error', 'always'],
         'react-hooks/rules-of-hooks': 'error',
         'react-hooks/exhaustive-deps': 'warn',
       },
       settings: { react: { version: 'detect' } },
     },
   ];
   ```

3. Update `package.json` lint scripts if needed.

4. Upgrade stylelint to latest:
   ```
   pnpm add -D stylelint@latest stylelint-config-standard-scss
   pnpm remove stylelint-config-standard
   ```

5. Update `stylelint.json` to extend `stylelint-config-standard-scss`.

### Files touched
- Deleted: `.eslintrc`
- Created: `eslint.config.js`
- Modified: `stylelint.json`, `package.json`

### Verification
- `pnpm lint` passes (or shows only real issues to fix)

---

## Phase 10 (Optional): Add TypeScript

**Goal:** Incremental TypeScript adoption for type safety.

### Steps

1. Install:
   ```
   pnpm add -D typescript @types/react @types/react-dom
   ```

2. Create `tsconfig.json` with strict mode.

3. Rename files `.jsx` → `.tsx` incrementally, starting with:
   - Utility files (`src/utils/`)
   - Slice files (`src/slices/`)
   - Simple leaf components (`src/components/common/`)
   - Work inward toward feature components

4. Add types to RTK slices and RTK Query endpoints (strongest ROI).

### Priority order
1. Slices + store (catches state shape bugs)
2. API layer (catches request/response mismatches)
3. Common components (catches prop bugs)
4. Feature components (incremental)

---

## Summary: Dependency Changes

### Removed
| Package | Reason |
|---|---|
| `react-scripts` | Replaced by Vite |
| `node-sass` | Replaced by `sass` |
| `connected-react-router` | Eliminated — React Router hooks |
| `history` | No longer needed |
| `redux` | Replaced by `@reduxjs/toolkit` |
| `redux-thunk` | Built into RTK |
| `redux-devtools-extension` | Built into RTK |
| `reselect` | Built into RTK |
| `moment` | Replaced by native Date |
| `ramda` | Replaced by native JS |
| `webfontloader` | Replaced by CSS/HTML link |
| `react-sizes` | Replaced by hook or CSS |
| `enzyme` / `enzyme-adapter-react-16` | Replaced by RTL |
| `redux-mock-store` | Not needed with RTK |
| `babel-eslint` | Deprecated |
| `eslint-config-standard` | Replaced by flat config |

### Added
| Package | Purpose |
|---|---|
| `vite` | Build tool |
| `@vitejs/plugin-react` | Vite React support |
| `sass` | SCSS compilation |
| `@reduxjs/toolkit` | State management |
| `react-router-dom@7` | Routing |
| `vitest` | Test runner |
| `@testing-library/react` | Component testing |
| `@testing-library/jest-dom` | DOM assertions |
| `@testing-library/user-event` | User interaction testing |
| `eslint@latest` | Linting |

---

## Recommended Execution Order

| Phase | Effort | Risk | Depends on |
|---|---|---|---|
| 1. Vite | Medium | Low | — |
| 2. Sass | Small | Low | Phase 1 |
| 3. React 19 | Medium | Medium | Phase 1 |
| 4. Redux Toolkit | Large | Medium | Phase 3 |
| 5. Vitest + RTL | Medium | Low | Phase 3 |
| 6. React Router v7 | Medium | Medium | Phase 4 |
| 7. Delete containers | Medium | Low | Phase 4 + 6 |
| 8. Remove moment/ramda | Small | Low | Phase 4 + 7 |
| 9. ESLint modernize | Small | Low | Phase 1 |
| 10. TypeScript | Large | Low | All above |

Phases 1-2, 5, and 9 can be done in parallel. Phases 4 → 6 → 7 → 8 are sequential.
