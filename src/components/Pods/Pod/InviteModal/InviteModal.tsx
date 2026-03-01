import React, { useState } from 'react';
import { useSendInvitationMutation } from '../../../../queries/pods';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Button from '../../../common/Button/Button';
import styles from './InviteModal.module.scss';

interface InviteModalProps {
  isOpen?: boolean;
  podId?: string;
  podName?: string;
  closeModal: () => void;
}

const InviteModal = ({ isOpen = false, podId = '', podName, closeModal }: InviteModalProps) => {
  const sendInvitation = useSendInvitationMutation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInvite = () => {
    sendInvitation.mutate({ podId, messageType: 'sms', to: phoneNumber });
    closeModal();
  };

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
          onPressEnter={handleInvite}
        />
        <Button
          className={styles.inviteButton}
          text={'Invite'}
          onClick={handleInvite}
        />
      </div>
    </Modal>
  );
};

export default InviteModal;
