import React from 'react';
import { object } from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Header from '../common/Header/container';
import {
  HOME_ROUTE,
  POD_SELECTION_ROUTE,
  CREATE_POD_ROUTE,
  JOIN_POD_ROUTE,
  ENTERTAINMENT_ROUTE,
  FOOD_ROUTE,
  TRAVEL_ROUTE,
  DEVELOPMENT_ROUTE,
  MY_PODS_ROUTE
} from '../../constants/routes';
import Home from '../Home/container';
import PodSelection from '../Pods/PodSelection/container';
import CreatePod from '../Pods/PodSelection/CreatePod/container';
import JoinPod from '../Pods/PodSelection/JoinPod/container';
import Entertainment from '../Entertainment/Entertainment';
import Food from '../Food/Food';
import Travel from '../Travel/Travel';
import Development from '../Development/Development';
import styles from './App.module.scss';

const App = ({ history }) => (
  <div className={styles.peapod}>
    <ConnectedRouter history={history}>
      <>
        <Header />
        <div className={styles.content}>
          <Switch>
            <Route path={HOME_ROUTE} exact component={Home} />
            <Route path={POD_SELECTION_ROUTE} exact component={PodSelection} />
            <Route path={MY_PODS_ROUTE} exact component={JoinPod} />
            <Route path={CREATE_POD_ROUTE} exact component={CreatePod} />
            <Route path={JOIN_POD_ROUTE} exact component={JoinPod} />
            <Route path={ENTERTAINMENT_ROUTE} component={Entertainment} />
            <Route path={FOOD_ROUTE} component={Food} />
            <Route path={TRAVEL_ROUTE} component={Travel} />
            <Route path={DEVELOPMENT_ROUTE} component={Development} />
          </Switch>
        </div>
      </>
    </ConnectedRouter >
  </div>
);

App.propTypes = {
  history: object.isRequired
};

export default App;
