import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product: { image, title, price } }) {
  return (
    <li className={styles.li}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.data}>
        <h3>{title}</h3>
        <p>{`${price.toLocaleString('ko-KR')}원`}</p>
      </div>
    </li>
  );
}
