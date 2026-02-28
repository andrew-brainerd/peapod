import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsCreatingPod, getCreatedPod, createPod } from '../../../slices/pods';
import { POD_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import styles from './CreateNewButton.module.scss';

const CreateNewButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newPod = useSelector(getCreatedPod);

  useEffect(() => {
    console.log(newPod);
    newPod && navigate(POD_ROUTE.replace(':podId', newPod._id));
  }, [navigate, newPod]);

  return (
    <Button
      className={styles.createNew}
      onClick={() => dispatch(createPod())}
    >
      <Icon name={'add'} title={'Create New Pod'} />
    </Button>
  );
};

export default CreateNewButton;
