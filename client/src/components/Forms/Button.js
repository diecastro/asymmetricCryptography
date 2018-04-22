import React from 'react';
import MaterialButton from 'material-ui/Button';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import styles from '../../styles/Button.scss';

const Button = ({ label, primary, href, onClick, raised, disabled }) => (
  <MaterialButton
      className={styles.Button}
      raised={raised}
      disabled={disabled}
      onClick={onClick}
      href={href}
  >
    <div className='btn btn-lg btn-primary btn-inside-parent text-uppercase'>{label}</div>
    <div className='btn-inside'><KeyboardArrowRight /></div>
  </MaterialButton>
);

export default Button;
