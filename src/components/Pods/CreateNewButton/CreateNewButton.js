import React from 'react';
import { func } from 'prop-types';
import { CREATE_POD_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import styles from './CreateNewButton.module.scss';

const CreatNewButton = ({ navTo }) => (
  <Button
    className={styles.createNew}
    onClick={() => navTo(CREATE_POD_ROUTE)}
  >
    <Icon name={'add'} title={'Create New Pod'} />
  </Button>
);

CreatNewButton.propTypes = {
  navTo: func.isRequired
};

export default CreatNewButton;
