import React from 'react';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillDelete,
} from 'react-icons/ai';
import { addOrUpdateCart, removeCart } from '../../api/firebase';
import styles from './CartItem.module.css';

export default function CartItem({
  product,
  uid,
  product: { id, image, title, option, quantity, price },
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateCart(uid, { ...product, quantity: quantity - 1 });
  };

  const handlePlus = () =>
    addOrUpdateCart(uid, { ...product, quantity: quantity + 1 });

  const handleDelete = () => removeCart(uid, id);

  const productPrice = parseInt(price);

  const productTotalPrice = productPrice * quantity;

  return (
    <li className={styles.li}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.info_text}>
          <p className={styles.info_text_title}>{title}</p>
          <p className={styles.info_text_option}>{option}</p>
          <p className={styles.info_text_price}>
            {' '}
            상품 총액: {`${productTotalPrice.toLocaleString('ko-KR')}원`}
          </p>
        </div>
        <div className={styles.info_quantity}>
          <AiFillMinusCircle
            onClick={handleMinus}
            className={styles.info_quantity_button}
          />
          <span>{quantity}</span>
          <AiFillPlusCircle
            onClick={handlePlus}
            className={styles.info_quantity_button}
          />
          <AiFillDelete
            onClick={handleDelete}
            className={styles.info_quantity_button}
          />
        </div>
      </div>
    </li>
  );
}
