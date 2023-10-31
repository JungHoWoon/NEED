import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../../api/firebase';
import ProductCard from '../ProductCard/ProductCard';
import styles from './Products.module.css';

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({ queryKey: ['products'], queryFn: getProducts });

  return (
    <>
      {isLoading && <p>로딩중...</p>}
      {error && <p>{error}</p>}
      <ul className={styles.ul}>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
