import React from 'react';
import styles from './Footer.module.scss';

const Footer = ({ isVisible }) => isVisible ? (
  <div className={styles.footer}>
    spinner brought to you by <a href="https://loading.io/spinner/double-ring">loading.io</a>
  </div>
) : null;

export default Footer;
