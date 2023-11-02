import React from 'react';
import { useUserContext } from '../context/userContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import CartItem from '../components/CartItem/CartItem';
import { BiPlusCircle } from 'react-icons/bi';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard/PriceCard';

const shipping = 3500;

export default function MyCart() {
  const {
    user: { uid },
  } = useUserContext();
  const { data: products } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  });

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section>
      {!hasProducts && <p>장바구니에 담김 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text='모든 상품 총액' price={totalPrice} />
            <BiPlusCircle />
            <PriceCard text='배송비' price={shipping} />
            <FaEquals />
            <PriceCard text='결제 금액' price={totalPrice + shipping} />
          </div>
          <button>주문하기</button>
        </>
      )}
    </section>
  );
}
