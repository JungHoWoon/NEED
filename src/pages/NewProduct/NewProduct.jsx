import React, { useState } from 'react';
import { uploadImage } from '../../api/upload';
import { addNewProduct } from '../../api/firebase';
import styles from './NewProduct.module.css';

export default function NewProduct() {
  const [product, setProduct] = useState({});

  const [file, setFile] = useState();

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addNewProduct(product, url) //
          .then(() => {
            alert(`${product.title}를 성공적으로 등록하였습니다.👍`);
            setFile();
            setProduct({});
          });
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.text}>신규 상품 등록</h2>

      <div className={styles.container}>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt='file'
            className={styles.image}
          />
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange}
            className={styles.input_image}
          />

          <label htmlFor='title' className={styles.input_label}>
            제품명
            <input
              type='text'
              name='title'
              id='title'
              value={product.title ?? ''}
              required
              placeholder='제품명을 입력하세요.'
              onChange={handleChange}
              autoComplete='off'
              className={styles.input}
            />
          </label>

          <label htmlFor='price' className={styles.input_label}>
            가격
            <input
              type='number'
              name='price'
              id='price'
              value={product.price ?? ''}
              required
              placeholder='가격을 입력하세요.'
              min='0'
              onChange={handleChange}
              autoComplete='off'
              className={styles.input}
            />
          </label>

          <label htmlFor='category' className={styles.input_label}>
            카테고리
            <input
              type='text'
              name='category'
              id='category'
              value={product.category ?? ''}
              required
              placeholder='카테고리를 입력하세요.'
              onChange={handleChange}
              autoComplete='off'
              className={styles.input}
            />
          </label>

          <label htmlFor='description' className={styles.input_label}>
            설명
            <input
              type='text'
              name='description'
              id='description'
              value={product.description ?? ''}
              required
              placeholder='제품 설명을 입력하세요.'
              onChange={handleChange}
              autoComplete='off'
              className={styles.input}
            />
          </label>

          <label htmlFor='option' className={styles.input_label}>
            옵션
            <input
              type='text'
              name='option'
              id='option'
              value={product.option ?? ''}
              required
              placeholder='상품 옵션은 (,)로 구분해 주세요'
              onChange={handleChange}
              autoComplete='off'
              className={styles.input}
            />
          </label>

          <button disabled={isUploading} className={styles.button}>
            {isUploading ? '업로드중....' : '등록하기'}
          </button>
        </form>
      </div>
    </section>
  );
}
