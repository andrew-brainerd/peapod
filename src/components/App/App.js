import React from 'react';
import { object } from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Header from '../common/Header/container';
import Spotify from '../Spotify/container';
import {
  HOME_ROUTE,
  POD_SELECTION_ROUTE,
  CREATE_POD_ROUTE,
  JOIN_POD_ROUTE,
  MY_PODS_ROUTE,
  SPOTIFY_AUTH_ROUTE,
  POD_ROUTE
} from '../../constants/routes';
import Home from '../Home/container';
import PodSelection from '../Pods/PodSelection/container';
import Pods from '../Pods/container';
import CreatePod from '../Pods/PodSelection/CreatePod/container';
import JoinPod from '../Pods/PodSelection/JoinPod/container';
import Pod from '../Pods/Pod/container';
import SpotifyAuth from '../Spotify/SpotifyAuth/container';
import styles from './App.module.scss';

const App = ({ history }) => (
  <div className={styles.peapod}>
    <ConnectedRouter history={history}>
      <>
        <Header />
        <Route path={HOME_ROUTE} exact component={Home} />
        <Route path={SPOTIFY_AUTH_ROUTE} exact component={SpotifyAuth} />
        <Spotify>
          <Switch>
            <Route path={POD_SELECTION_ROUTE} exact component={PodSelection} />
            <Route path={MY_PODS_ROUTE} exact component={Pods} />
            <Route path={CREATE_POD_ROUTE} exact component={CreatePod} />
            <Route path={JOIN_POD_ROUTE} exact component={JoinPod} />
            <Route path={POD_ROUTE} exact component={Pod} />
          </Switch>
        </Spotify>
      </>
    </ConnectedRouter >
  </div>
);

App.propTypes = {
  history: object.isRequired
};

export default App;
