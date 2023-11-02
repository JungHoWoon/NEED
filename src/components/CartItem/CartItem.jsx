import React from 'react';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillDelete,
} from 'react-icons/ai';
import { addOrUpdateCart, removeCart } from '../../api/firebase';

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
    <li>
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{option}</p>
        <p> 상품 총액 {`${productTotalPrice.toLocaleString('ko-KR')}원`}</p>
        <div>
          <AiFillMinusCircle onClick={handleMinus} />
          <span>{quantity}</span>
          <AiFillPlusCircle onClick={handlePlus} />
          <AiFillDelete onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
