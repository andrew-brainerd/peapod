import React from 'react';
import { object } from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Spotify from '../Spotify/container';
import {
  HOME_ROUTE,
  CREATE_POD_ROUTE,
  PODS_ROUTE,
  SPOTIFY_AUTH_ROUTE,
  POD_ROUTE
} from '../../constants/routes';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../constants/pods';
import Home from '../Home/container';
import Pods from '../Pods/container';
import CreatePod from '../Pods/CreatePod/container';
import Pod from '../Pods/Pod/container';
import SpotifyAuth from '../Spotify/SpotifyAuth/container';
import styles from './App.module.scss';

const App = ({ history }) => (
  <div className={styles.peapod}>
    <ConnectedRouter history={history}>
      <>
        <Route path={HOME_ROUTE} exact component={Home} />
        <Route path={SPOTIFY_AUTH_ROUTE} exact component={SpotifyAuth} />
        <Spotify>
          <Switch>
            <Route path={PODS_ROUTE} exact component={Pods} />
            <Route path={CREATE_POD_ROUTE} exact component={CreatePod} />
            <Route path={POD_ROUTE} exact component={Pod} />
            <Route path={'/pods'} exact>
              <div>PODS</div>
            </Route>
            <Route exact path={`${POD_ROUTE}/search`} render={props => (
              <Pod {...props} view={SEARCH} />
            )} />
            <Route exact path={`${POD_ROUTE}/player`} render={props => (
              <Pod {...props} view={NOW_PLAYING} />
            )} />
            <Route exact path={`${POD_ROUTE}/queue`} render={props => (
              <Pod {...props} view={PLAY_QUEUE} />
            )} />
            <Route exact path={`${POD_ROUTE}/history`} render={props => (
              <Pod {...props} view={PLAY_HISTORY} />
            )} />
          </Switch>
        </Spotify>
      </>
    </ConnectedRouter>
  </div>
);

App.propTypes = {
  history: object.isRequired
};

export default App;
