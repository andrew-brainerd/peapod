import React, { useState, useEffect } from 'react';
import { func, array } from 'prop-types';
import Pod from '../../Pod/Pod';
import Modal from '../../../common/Modal/Modal';
import PodMembers from '../../PodMembers/PodMembers';
import Button from '../../../common/Button/Button';
import styles from './JoinPod.module.scss';

const getName = pod => pod && pod.name;
const getMembers = pod => (pod && pod.members) || [];
const getNumMembers = pod => !!getMembers(pod) && pod.members.length;

const JoinPod = ({ getPods, pods, joinPod }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPod, setSelectedPod] = useState(null);

  useEffect(() => {
    getPods();
  }, [getPods, pods.length]);

  return (
    <div className={styles.joinPod}>
      <div className={styles.podList}>
        {(pods || []).map((pod, p) =>
          <Pod
            key={p}
            name={getName(pod)}
            numMembers={getNumMembers(pod)}
            action={isOpen => {
              setSelectedPod(pod);
              setIsModalOpen(isOpen);
            }}
          />
        )}
      </div>
      <Modal
        className={styles.joinPodModal}
        headerText={`Pod Details for ${getName(selectedPod)}`}
        isOpen={isModalOpen}
        onOpen={() => console.log(`Opened Modal`)}
        closeModal={() => setIsModalOpen(false)}
      >
        <PodMembers members={getMembers(selectedPod)} />
        <Button
          className={styles.joinButton}
          text={'Join Pod'}
          onClick={() => joinPod(selectedPod)}
        />
      </Modal>
    </div>
  );
}

JoinPod.propTypes = {
  getPods: func.isRequired,
  pods: array
}

export default JoinPod;
