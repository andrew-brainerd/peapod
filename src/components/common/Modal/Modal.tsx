import React from 'react';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import './Modal.css';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  contentClassName?: string;
  headerText?: string;
  onOpen?: () => void;
  closeModal: () => void;
}

const Modal = ({
  className,
  isOpen,
  children,
  contentClassName,
  headerText,
  onOpen,
  closeModal
}: ModalProps) => (
  <ReactModal
    className={`bg-modal-bg h-[350px] mx-auto mt-[60px] max-w-[600px] outline-none relative w-[70%] z-[1000] max-mobile:mt-[30px] max-mobile:w-[98%] ${className || ''}`}
    overlayClassName="bg-black/60 fixed top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-200 ease-in-out z-[999]"
    isOpen={isOpen}
    onAfterOpen={onOpen}
    onRequestClose={closeModal}
    contentLabel={'Pod Preview'}
    closeTimeoutMS={200}
  >
    <div className="flex items-center bg-btn text-text-primary h-[30px]">
      <div className="inline-block ml-2.5">{headerText}</div>
      <Button
        className="!flex items-center !shadow-none !rounded-none rounded-tr-[5px] rounded-bl-[5px] text-[16px] !h-[30px] opacity-50 !absolute right-0 align-bottom !w-[30px] hover:!shadow-none hover:opacity-100 hover:!transform-none"
        text={'X'}
        onClick={closeModal}
      />
    </div>
    <div className={`h-[90%] m-5 ${contentClassName || ''}`}>{children}</div>
  </ReactModal>
);

export default Modal;
