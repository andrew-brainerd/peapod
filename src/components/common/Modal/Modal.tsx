import React from 'react';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
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
    className={[styles.modal, className].join(' ')}
    overlayClassName={styles.overlay}
    isOpen={isOpen}
    onAfterOpen={onOpen}
    onRequestClose={closeModal}
    contentLabel={'Pod Preview'}
    closeTimeoutMS={200}
  >
    <div className={styles.header}>
      <div className={styles.headerText}>{headerText}</div>
      <Button
        className={styles.closeButton}
        text={'X'}
        onClick={closeModal}
      />
    </div>
    <div className={[styles.content, contentClassName].join(' ')}>
      {children}
    </div>
  </ReactModal>
);

export default Modal;
