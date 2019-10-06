import React, { useState, useRef, useEffect } from 'react';
import { func } from 'prop-types';
import styles from './CreatePod.module.scss';
import Button from '../../../common/Button/Button';

const CreatePod = ({ createPod, createdPodName }) => {
  const [podName, setPodName] = useState('');
  const [inputError, setInputError] = useState(null);
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
  }

  const create = () => validate() && createPod(podName);

  return (
    <div className={styles.createPod}>
      <input
        id={'podName'}
        type={'text'}
        className={styles.podNameInput}
        placeholder={'Pod Name'}
        ref={nameInput} 
        value={podName}
        autoComplete={false}
        onChange={e => setPodName(e.target.value)}
        onKeyPress={({ key }) => {
          key === 'Enter' && create()
        }}
      />
      {inputError && (
        <div className={styles.inputError}>
          {inputError}
        </div>
      )}
      {createdPodName && (
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
  )
}

CreatePod.propTypes = {
  createPod: func.isRequired
}

export default CreatePod;
