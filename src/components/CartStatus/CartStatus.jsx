import React from 'react';
import { BiSolidCart } from 'react-icons/bi';
import styles from './CartStatus.module.css';
import useCart from '../../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className={styles.cart}>
      <BiSolidCart />
      {products && <p className={styles.quantity}>{products.length}</p>}
    </div>
  );
}
