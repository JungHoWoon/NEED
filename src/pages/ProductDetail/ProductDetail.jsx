import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styles from './ProductDetail.module.css';
import { addOrUpdateCart } from '../../api/firebase';
import { useUserContext } from '../../context/userContext';

export default function ProductDetail() {
  const {
    user: { uid },
  } = useUserContext();

  const {
    state: {
      product: { image, title, price, category, description, option, id },
    },
  } = useLocation();

  const [selected, setSelected] = useState(option && option[0]);

  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = (e) => {
    const product = { id, image, price, title, option: selected, quantity: 1 };
    addOrUpdateCart(uid, product);
  };

  return (
    <>
      <section className={styles.section}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.text}>
          <p className={styles.text_category}>{category}</p>
          <h2 className={styles.text_title}>{title}</h2>
          <p className={styles.text_price}>{`${price.toLocaleString(
            'ko-KR'
          )}원`}</p>
          <div className={styles.select}>
            <p className={styles.select_text}>옵션:</p>
            <select
              onChange={handleSelect}
              value={selected}
              className={styles.select_option}
            >
              {option &&
                option.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <button className={styles.button} onClick={handleClick}>
            장바구니에 추가
          </button>
        </div>
      </section>
      <p className={styles.description}>{description}</p>
    </>
  );
}
