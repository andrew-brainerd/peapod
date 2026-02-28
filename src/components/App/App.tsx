import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Spotify from '../Spotify/Spotify';
import {
  HOME_ROUTE,
  PODS_ROUTE,
  SPOTIFY_AUTH_ROUTE,
  POD_ROUTE
} from '../../constants/routes';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../constants/pods';
import Home from '../Home/Home';
import Pods from '../Pods/Pods';
import PodLobby from '../Pods/PodLobby/PodLobby';
import Pod from '../Pods/Pod/Pod';
import SpotifyAuth from '../Spotify/SpotifyAuth/SpotifyAuth';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.peapod}>
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={SPOTIFY_AUTH_ROUTE} element={<SpotifyAuth />} />
    </Routes>
    <Spotify>
      <Routes>
        <Route path={PODS_ROUTE} element={<Pods />} />
        <Route path={POD_ROUTE} element={<PodLobby />} />
        <Route path={`${POD_ROUTE}/search`} element={<Pod view={SEARCH} />} />
        <Route path={`${POD_ROUTE}/player`} element={<Pod view={NOW_PLAYING} />} />
        <Route path={`${POD_ROUTE}/queue`} element={<Pod view={PLAY_QUEUE} />} />
        <Route path={`${POD_ROUTE}/history`} element={<Pod view={PLAY_HISTORY} />} />
      </Routes>
    </Spotify>
  </div>
);

export default App;
