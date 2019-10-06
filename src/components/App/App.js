import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Header from '../common/Header/container';
import {
  HOME_ROUTE,
  POD_SELECTION_ROUTE,
  ENTERTAINMENT_ROUTE,
  FOOD_ROUTE,
  TRAVEL_ROUTE,
  DEVELOPMENT_ROUTE
} from '../../constants/routes';
import Home from '../Home/container';
import PodSelection from '../Pods/PodSelection/container';
import { CREATE_POD_ROUTE, JOIN_POD_ROUTE } from '../../constants/routes';
import CreatePod from '../Pods/PodSelection/CreatePod/container';
import Entertainment from '../Entertainment/Entertainment';
import Food from '../Food/Food';
import Travel from '../Travel/Travel';
import Development from '../Development/Development';
import Footer from '../common/Footer/container';
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
            <Route path={CREATE_POD_ROUTE} exact component={CreatePod} />
            <Route path={ENTERTAINMENT_ROUTE} component={Entertainment} />
            <Route path={FOOD_ROUTE} component={Food} />
            <Route path={TRAVEL_ROUTE} component={Travel} />
            <Route path={DEVELOPMENT_ROUTE} component={Development} />
            {/* <Route path='*' component={Home} /> */}
          </Switch>
        </div>
        <Footer />
      </>
    </ConnectedRouter >
  </div>
);

export default App;
