import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store/configureStore';
import { sendInvitation } from '../../../../slices/pods';
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
  const dispatch = useDispatch<AppDispatch>();
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
            dispatch(sendInvitation(podId, 'sms', phoneNumber));
            closeModal();
          }}
        />
        <Button
          className={styles.inviteButton}
          text={'Invite'}
          onClick={() => {
            dispatch(sendInvitation(podId, 'sms', phoneNumber));
            closeModal();
          }}
        />
      </div>
    </Modal>
  );
};

export default InviteModal;
