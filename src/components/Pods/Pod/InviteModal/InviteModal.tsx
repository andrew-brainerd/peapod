import React, { useState, useRef } from 'react';
import { useSendInvitationMutation, useInviteLink } from '../../../../queries/pods';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Button from '../../../common/Button/Button';
import Icon from '../../../common/Icon/Icon';
import styles from './InviteModal.module.scss';

type InviteTab = 'link' | 'sms' | 'email';

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
  const [activeTab, setActiveTab] = useState<InviteTab>('link');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

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
        Invite to <span className={styles.inviteTitle}>{podName || 'Pod'}</span>
      </div>

      <div className={styles.tabs}>
        <button
          className={[styles.tab, activeTab === 'link' ? styles.active : ''].join(' ')}
          onClick={() => setActiveTab('link')}
        >
          <Icon className={styles.tabIcon} name={'link'} title={'Share Link'} />
          <span className={styles.tabLabel}>Link</span>
        </button>
        <button
          className={[styles.tab, activeTab === 'sms' ? styles.active : ''].join(' ')}
          onClick={() => setActiveTab('sms')}
        >
          <Icon className={styles.tabIcon} name={'sms'} title={'SMS'} />
          <span className={styles.tabLabel}>SMS</span>
        </button>
        <button
          className={[styles.tab, activeTab === 'email' ? styles.active : ''].join(' ')}
          onClick={() => setActiveTab('email')}
        >
          <Icon className={styles.tabIcon} name={'email'} title={'Email'} />
          <span className={styles.tabLabel}>Email</span>
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'link' && (
          <div className={styles.linkPanel}>
            <div className={styles.linkRow}>
              <input
                ref={linkInputRef}
                className={styles.linkInput}
                type="text"
                value={inviteLink}
                readOnly
                onFocus={() => linkInputRef.current?.select()}
              />
              <Button
                className={styles.copyButton}
                text={linkCopied ? 'Copied!' : 'Copy'}
                onClick={handleCopyLink}
              />
            </div>
          </div>
        )}

        {activeTab === 'sms' && (
          <div className={styles.inputPanel}>
            <TextInput
              placeholder={'Phone Number'}
              inputClassName={styles.contactInput}
              autofocus
              value={phoneNumber}
              onChange={setPhoneNumber}
              onPressEnter={handleSmsInvite}
            />
            <Button className={styles.actionButton} text={'Send SMS'} onClick={handleSmsInvite} />
          </div>
        )}

        {activeTab === 'email' && (
          <div className={styles.inputPanel}>
            <TextInput
              placeholder={'Email Address'}
              inputClassName={styles.contactInput}
              autofocus
              value={email}
              onChange={setEmail}
              onPressEnter={handleEmailInvite}
            />
            <Button className={styles.actionButton} text={'Send Email'} onClick={handleEmailInvite} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InviteModal;
