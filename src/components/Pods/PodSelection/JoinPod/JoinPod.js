import React, { useState, useEffect } from 'react';
import { func, array, object } from 'prop-types';
import Pod from '../../Pod/Pod';
import Modal from '../../../common/Modal/Modal';
import PodMembers from '../../PodMembers/PodMembers';
import Button from '../../../common/Button/Button';
import styles from './JoinPod.module.scss';

const getId = pod => pod && pod._id;
const getName = pod => pod && pod.name;
const getMembers = pod => (pod && pod.members) || [];
const getNumMembers = pod => !!getMembers(pod) && pod.members.length;
const userInPod = (userName, pod) => !!getMembers(pod).find(({ name }) => name === userName);

const JoinPod = ({ getPods, pods, joinPod, leavePod, userName }) => {
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
        closeModal={() => setIsModalOpen(false)}
      >
        <PodMembers members={getMembers(selectedPod)} />
        {userInPod(userName, selectedPod) ?
          (<Button
            className={styles.leaveButton}
            text={'Leave Pod'}
            onClick={() => {
              leavePod(getId(selectedPod));
              setIsModalOpen(false);
            }}
          />) :
          (<Button
            className={styles.joinButton}
            text={'Join Pod'}
            onClick={() => {
              joinPod(getId(selectedPod));
              setIsModalOpen(false);
            }}
          />)}
      </Modal>
    </div>
  );
}

JoinPod.propTypes = {
  getPods: func.isRequired,
  pods: array,
  joinPod: func.isRequired,
  leavePod: func.isRequired,
  user: object
}

export default JoinPod;
