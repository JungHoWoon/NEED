import React from 'react';
import styles from './User.module.css';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div>
      <img src={photoURL} alt={displayName} className={styles.img} />
    </div>
  );
}
