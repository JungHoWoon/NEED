import React from 'react';
import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router';

export default function ProductCard({
  product,
  product: { image, title, price, id },
}) {
  const navigate = useNavigate();
  return (
    <li
      className={styles.li}
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
    >
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.data}>
        <h3>{title}</h3>
        <p>{`${price.toLocaleString('ko-KR')}원`}</p>
      </div>
    </li>
  );
}
