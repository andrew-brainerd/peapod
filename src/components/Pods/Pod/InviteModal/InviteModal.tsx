import React, { useState } from 'react';
import { useSendInvitationMutation, useInviteLink } from '../../../../queries/pods';
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
  const { data: inviteLinkData } = useInviteLink(podId);
  const inviteLink = inviteLinkData?.inviteLink ?? '';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSmsInvite = () => {
    if (!phoneNumber) return;
    sendInvitation.mutate({ podId, messageType: 'sms', to: phoneNumber });
    setPhoneNumber('');
    closeModal();
  };

  const handleEmailInvite = () => {
    if (!email) return;
    sendInvitation.mutate({ podId, messageType: 'email', to: email });
    setEmail('');
    closeModal();
  };

  const handleCopyLink = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
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

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Share a link</div>
        <div className={styles.linkRow}>
          <div className={styles.linkText}>{inviteLink}</div>
          <Button
            className={styles.copyButton}
            text={linkCopied ? 'Copied!' : 'Copy'}
            onClick={handleCopyLink}
          />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Send via SMS</div>
        <div className={styles.inputFields}>
          <TextInput
            placeholder={'Phone Number'}
            inputClassName={styles.contactInput}
            value={phoneNumber}
            onChange={setPhoneNumber}
            onPressEnter={handleSmsInvite}
          />
          <Button className={styles.sendButton} text={'Send'} onClick={handleSmsInvite} />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Send via Email</div>
        <div className={styles.inputFields}>
          <TextInput
            placeholder={'Email Address'}
            inputClassName={styles.contactInput}
            value={email}
            onChange={setEmail}
            onPressEnter={handleEmailInvite}
          />
          <Button className={styles.sendButton} text={'Send'} onClick={handleEmailInvite} />
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
