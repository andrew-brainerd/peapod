import React, { useState } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { POD_SEARCH_ROUTE } from '../../../constants/routes';
import Header from '../../common/Header/container';
import TextInput from '../../common/TextInput/TextInput';
import Button from '../../common/Button/Button';
import styles from './CreatePod.module.scss';

const CreatePod = ({ isCreatingPod, createPod, createdPod, navTo }) => {
  const [podName, setPodName] = useState('');
  const [inputError, setInputError] = useState(null);
  const [showCreated, setShowCreated] = useState(false);

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
      if (!!newPod) {
        clear();
        setTimeout(() => {
          setShowCreated(false);
          navTo(POD_SEARCH_ROUTE.replace(':podId', (newPod || {})._id));
        }, 3000);
      }
    })
    .catch(err => console.error('Failed to create pod', err));

  return (
    <>
      <Header />
      <div className={styles.createPod}>
        <TextInput
          placeholder={'Pod Name'}
          inputClassName={styles.podNameInput}
          autofocus
          value={podName}
          onChange={setPodName}
          onPressEnter={create}
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
          disabled={isCreatingPod}
        />
      </div>
    </>
  );
};

CreatePod.propTypes = {
  isCreatingPod: bool,
  createPod: func.isRequired,
  createdPod: shape({
    name: string
  }),
  navTo: func.isRequired
};

export default CreatePod;
