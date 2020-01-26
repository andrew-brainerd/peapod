import React from 'react';
import { bool, func, string, node } from 'prop-types';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import './Modal.css';

const Modal = ({
  isOpen,
  onOpen,
  closeModal,
  headerText,
  children,
  className,
  contentClassName
}) => (
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

Modal.propTypes = {
  isOpen: bool.isRequired,
  onOpen: func,
  closeModal: func.isRequired,
  headerText: string,
  children: node,
  className: string,
  contentClassName: string
};

export default Modal;
