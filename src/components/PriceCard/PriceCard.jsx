import React from 'react';
import styles from './PriceCard.module.css';

export default function PriceCard({ text, price }) {
  return (
    <div className={styles.div}>
      <p className={styles.text}>{text}</p>
      <p className={styles.price}>{`${price.toLocaleString('ko-KR')}원`}</p>
    </div>
  );
}
