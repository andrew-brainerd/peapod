import React, { useState, useRef, useEffect } from 'react';
import { func, string } from 'prop-types';
import styles from './CreatePod.module.scss';
import Button from '../../../common/Button/Button';

const CreatePod = ({ createPod, createdPodName }) => {
  const [podName, setPodName] = useState('');
  const [inputError, setInputError] = useState(null);
  const [showCreated, setShowCreated] = useState(false);
  const nameInput = useRef();

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const validate = () => {
    if (!podName) {
      setInputError('Please provide a pod name');
      return false;
    }
    setInputError(null);
    return true;
  };

  const clear = () => {
    setPodName('');
    setInputError(null);
    setTimeout(() => setShowCreated(false), 3000);
  };

  const create = () => validate() && createPod(podName)
    .then(() => { setShowCreated(true); clear(); });

  return (
    <div className={styles.createPod}>
      <input
        id={'podName'}
        type={'text'}
        className={styles.podNameInput}
        placeholder={'Pod Name'}
        ref={nameInput}
        value={podName}
        autoComplete={'false'}
        onChange={e => setPodName(e.target.value)}
        onKeyPress={({ key }) => key === 'Enter' && create()}
      />
      {inputError && (
        <div className={styles.inputError}>
          {inputError}
        </div>
      )}
      {createdPodName && showCreated && (
        <div className={styles.createdPodName}>
          {`Created Pod ${createdPodName}`}
        </div>
      )}
      <Button
        text={'Create'}
        className={styles.createButton}
        onClick={create}
      />
    </div>
  );
};

CreatePod.propTypes = {
  createPod: func.isRequired,
  createdPodName: string
};

export default CreatePod;
