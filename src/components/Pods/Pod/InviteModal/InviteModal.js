import React, { useState } from 'react';
import { bool, string, func } from 'prop-types';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Button from '../../../common/Button/Button';
import styles from './InviteModal.module.scss';

const InviteModal = ({ isOpen, podId, podName, closeModal, sendInvitation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <Modal
      className={styles.inviteModal}
      isOpen={isOpen}
      closeModal={closeModal}
      contentClassName={styles.inviteModalContent}
    >
      <div className={styles.inviteModalText}>
        Invite People to the <span className={styles.inviteTitle}>{podName}</span> Pod
          </div>
      <div className={styles.inputFields}>
        <TextInput
          placeholder={'Phone Number'}
          inputClassName={styles.phoneInput}
          autofocus
          value={phoneNumber}
          onChange={setPhoneNumber}
          onPressEnter={() => {
            sendInvitation(podId, 'sms', phoneNumber);
            closeModal();
          }}
        />
        <Button
          className={styles.inviteButton}
          text={'Invite'}
          onClick={() => {
            sendInvitation(podId, 'sms', phoneNumber);
            closeModal();
          }}
        />
      </div>
    </Modal>
  );
};

InviteModal.propTypes = {
  isOpen: bool,
  podId: string,
  podName: string,
  closeModal: func.isRequired,
  sendInvitation: func.isRequired
};

export default InviteModal;
