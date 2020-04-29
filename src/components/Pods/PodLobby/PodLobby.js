import React, { useEffect } from 'react';
import { string, arrayOf, shape, bool, func } from 'prop-types';
import { isDefined } from '../../../utils/validation';
import { POD_SEARCH_ROUTE } from '../../../constants/routes';
import Header from '../../common/Header/container';
import Button from '../../common/Button/Button';
import styles from './PodLobby.module.scss';

const PodLobby = ({ podId, podMembers, shouldUpdate, getPod, navTo }) => {
  useEffect(() => {
    isDefined(podId) && getPod(podId);
  }, [podId, getPod]);

  return (
    <>
      <Header />
      <div className={styles.podLobby}>
        <div className={styles.podMembers}>
          {podMembers.map(({ display_name: name }, p) =>
            <div key={p} className={styles.podMember}>{name}</div>
          )}
        </div>
        <Button
          className={styles.launchButton}
          text={'Launch Pod'}
          onClick={() =>
            navTo(POD_SEARCH_ROUTE.replace(':podId', podId))
          }
        />
      </div>
    </>
  );
};

PodLobby.propTypes = {
  podId: string,
  podMembers: arrayOf(shape({
    display_name: string
  })),
  shouldUpdate: bool,
  getPod: func.isRequired,
  navTo: func.isRequired
};

export default PodLobby;
