import React from 'react';
import { BiSolidCart } from 'react-icons/bi';
import { useUserContext } from '../../context/userContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/firebase';
import styles from './CartStatus.module.css';

export default function CartStatus() {
  const {
    user: { uid },
  } = useUserContext();
  const { data: products } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  });
  return (
    <div className={styles.cart}>
      <BiSolidCart />
      {products && <p className={styles.quantity}>{products.length}</p>}
    </div>
  );
}
