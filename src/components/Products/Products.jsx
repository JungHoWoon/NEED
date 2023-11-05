import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './Products.module.css';
import useProducts from '../../hooks/useProducts';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

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
