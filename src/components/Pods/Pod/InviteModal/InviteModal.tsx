import React, { useState, useRef } from 'react';
import { useSendInvitationMutation, useInviteLink } from '../../../../queries/pods';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Button from '../../../common/Button/Button';
import Icon from '../../../common/Icon/Icon';

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
      className="!h-auto !max-w-[420px]"
      isOpen={isOpen}
      closeModal={closeModal}
      contentClassName="!flex flex-col !h-auto !p-[12px_8px_20px]"
    >
      <div className="text-[1.2em] mb-5 text-center select-none">
        Invite to <span className="text-peapod">{podName || 'Pod'}</span>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        <button
          className={`flex items-center flex-col gap-1 p-[12px_20px] w-[90px] rounded-[6px] border cursor-pointer transition-[background,border-color,color] duration-150 ease-in-out max-mobile:p-[10px_14px] max-mobile:w-[80px] ${activeTab === 'link' ? 'bg-gray-70 border-peapod text-peapod [&_svg]:fill-peapod' : 'bg-gray-80 border-transparent text-gray-30 [&_svg]:fill-gray-30 hover:bg-gray-70 hover:text-text-primary hover:[&_svg]:fill-text-primary'}`}
          onClick={() => setActiveTab('link')}
        >
          <Icon className="[&_svg]:h-[22px] [&_svg]:transition-[fill] [&_svg]:duration-150 [&_svg]:ease-in-out [&_svg]:w-[22px]" name={'link'} title={'Share Link'} />
          <span className="text-[0.75em] uppercase">Link</span>
        </button>
        <button
          className={`flex items-center flex-col gap-1 p-[12px_20px] w-[90px] rounded-[6px] border cursor-pointer transition-[background,border-color,color] duration-150 ease-in-out max-mobile:p-[10px_14px] max-mobile:w-[80px] ${activeTab === 'sms' ? 'bg-gray-70 border-peapod text-peapod [&_svg]:fill-peapod' : 'bg-gray-80 border-transparent text-gray-30 [&_svg]:fill-gray-30 hover:bg-gray-70 hover:text-text-primary hover:[&_svg]:fill-text-primary'}`}
          onClick={() => setActiveTab('sms')}
        >
          <Icon className="[&_svg]:h-[22px] [&_svg]:transition-[fill] [&_svg]:duration-150 [&_svg]:ease-in-out [&_svg]:w-[22px]" name={'sms'} title={'SMS'} />
          <span className="text-[0.75em] uppercase">SMS</span>
        </button>
        <button
          className={`flex items-center flex-col gap-1 p-[12px_20px] w-[90px] rounded-[6px] border cursor-pointer transition-[background,border-color,color] duration-150 ease-in-out max-mobile:p-[10px_14px] max-mobile:w-[80px] ${activeTab === 'email' ? 'bg-gray-70 border-peapod text-peapod [&_svg]:fill-peapod' : 'bg-gray-80 border-transparent text-gray-30 [&_svg]:fill-gray-30 hover:bg-gray-70 hover:text-text-primary hover:[&_svg]:fill-text-primary'}`}
          onClick={() => setActiveTab('email')}
        >
          <Icon className="[&_svg]:h-[22px] [&_svg]:transition-[fill] [&_svg]:duration-150 [&_svg]:ease-in-out [&_svg]:w-[22px]" name={'email'} title={'Email'} />
          <span className="text-[0.75em] uppercase">Email</span>
        </button>
      </div>

      <div>
        {activeTab === 'link' && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                ref={linkInputRef}
                className="appearance-none bg-primary border border-transparent rounded-[5px] text-text-primary outline-none py-2.5 px-[5px] transition-[border] duration-200 focus:border-accent text-gray-20 flex-1 text-[0.85em] min-w-0 overflow-hidden text-ellipsis"
                type="text"
                value={inviteLink}
                readOnly
                onFocus={() => linkInputRef.current?.select()}
              />
              <Button
                className="!bg-peapod !text-gray-100 !text-[0.85em] !py-2 !px-4 !whitespace-nowrap !w-auto hover:!bg-peapod-80"
                text={linkCopied ? 'Copied!' : 'Copy'}
                onClick={handleCopyLink}
              />
            </div>
          </div>
        )}

        {activeTab === 'sms' && (
          <div className="flex flex-col gap-3">
            <TextInput
              placeholder={'Phone Number'}
              inputClassName="appearance-none bg-primary border border-transparent rounded-[5px] text-text-primary outline-none py-2.5 px-[5px] transition-[border] duration-200 focus:border-accent text-[1em] w-full"
              autofocus
              value={phoneNumber}
              onChange={setPhoneNumber}
              onPressEnter={handleSmsInvite}
            />
            <Button className="!bg-peapod !text-gray-100 !text-[0.9em] !p-2.5 !w-full hover:!bg-peapod-80" text={'Send SMS'} onClick={handleSmsInvite} />
          </div>
        )}

        {activeTab === 'email' && (
          <div className="flex flex-col gap-3">
            <TextInput
              placeholder={'Email Address'}
              inputClassName="appearance-none bg-primary border border-transparent rounded-[5px] text-text-primary outline-none py-2.5 px-[5px] transition-[border] duration-200 focus:border-accent text-[1em] w-full"
              autofocus
              value={email}
              onChange={setEmail}
              onPressEnter={handleEmailInvite}
            />
            <Button className="!bg-peapod !text-gray-100 !text-[0.9em] !p-2.5 !w-full hover:!bg-peapod-80" text={'Send Email'} onClick={handleEmailInvite} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InviteModal;
