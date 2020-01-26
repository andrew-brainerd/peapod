import React, { useState, useRef, useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import styles from './CreatePod.module.scss';
import Button from '../../../common/Button/Button';
import { POD_ROUTE } from '../../../../constants/routes';

const CreatePod = ({ createPod, createdPod, navTo }) => {
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
    setShowCreated(true);
    setPodName('');
    setInputError(null);
  };

  const create = () => validate() && createPod(podName)
    .then(newPod => {
      clear();
      setTimeout(() => {
        setShowCreated(false);
        navTo(POD_ROUTE.replace(':podId', (newPod || {})._id));
      }, 3000);
    })
    .catch(err => console.error('Failed to create pod', err));

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
      {createdPod && createdPod.name && showCreated && (
        <div className={styles.createdPodName}>
          {`Created Pod ${createdPod.name}`}
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
  createdPod: shape({
    name: string
  }),
  navTo: func.isRequired
};

export default CreatePod;
