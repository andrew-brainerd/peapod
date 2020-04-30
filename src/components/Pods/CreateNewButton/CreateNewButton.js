import React, { useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { POD_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import styles from './CreateNewButton.module.scss';

const CreateNewButton = ({ createPod, newPod, navTo }) => {
  useEffect(() => {
    console.log(newPod);
    newPod && navTo(POD_ROUTE.replace(':podId', newPod._id));
  }, [navTo, newPod]);

  return (
    <Button
      className={styles.createNew}
      onClick={createPod}
    >
      <Icon name={'add'} title={'Create New Pod'} />
    </Button>
  );
};

CreateNewButton.propTypes = {
  newPod: shape({
    _id: string
  }),
  createPod: func.isRequired,
  navTo: func.isRequired
};

export default CreateNewButton;
