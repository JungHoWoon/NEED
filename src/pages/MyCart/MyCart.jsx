import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import { BiPlusCircle } from 'react-icons/bi';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../../components/PriceCard/PriceCard';
import styles from './MyCart.module.css';
import useCart from '../../hooks/useCart';

const shipping = 3500;

export default function MyCart() {
  const {
    cartQuery: { data: products },
  } = useCart();

  const hasProducts = products && products.length > 0;

  const totalPrice =
    hasProducts &&
    products.reduce(
      (prev, current) =>
        prev + parseInt(current.price) * parseInt(current.quantity),
      0
    );

  return (
    <section className={styles.section}>
      <h2 className={styles.text}>내 장바구니</h2>
      {!hasProducts && <p>장바구니에 담김 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className={styles.ul}>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className={styles.price}>
            <PriceCard text='모든 상품 총액' price={totalPrice} />
            <BiPlusCircle className={styles.price_icon} />
            <PriceCard text='배송비' price={shipping} />
            <FaEquals className={styles.price_icon} />
            <PriceCard text='결제 금액' price={totalPrice + shipping} />
          </div>
          <button className={styles.button}>주문하기</button>
        </>
      )}
    </section>
  );
}
