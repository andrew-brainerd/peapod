import React, { useState, useEffect } from 'react';
import { func, array } from 'prop-types';
import Pod from '../../Pod/Pod';
import Modal from '../../../common/Modal/Modal';
import styles from './JoinPod.module.scss';

const JoinPod = ({ getPods, pods }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(`Get Pods`);
    getPods();
  }, [getPods, pods.length]);

  return (
    <div className={styles.joinPod}>
      <div className={styles.podList}>
        {(pods || []).map(({ name }, p) =>
          <Pod
            key={p}
            name={name}
            action={isOpen => setIsModalOpen(isOpen)}
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onOpen={() => console.log(`Opened Modal`)}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}

JoinPod.propTypes = {
  getPods: func.isRequired,
  pods: array
}

export default JoinPod;
