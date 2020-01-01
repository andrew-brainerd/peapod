import React from 'react';
import { bool } from 'prop-types';
import styles from './Footer.module.scss';

const Footer = ({ isVisible }) => isVisible ? (
  <div className={styles.footer}>
    spinner brought to you by <a href="https://loading.io/spinner/double-ring">loading.io</a>
  </div>
) : null;

Footer.propTypes = {
  isVisible: bool
};

export default Footer;
