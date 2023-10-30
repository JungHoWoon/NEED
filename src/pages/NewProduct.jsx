import React, { useState } from 'react';
import { uploadImage } from '../api/upload';

export default function NewProduct() {
  const [product, setProduct] = useState({});

  const [file, setFile] = useState();

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
    uploadImage(file).then((url) => {
      console.log(url);
    });
  };

  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt='file' />}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          required
          placeholder='제품명을 입력하세요.'
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          required
          placeholder='가격을 입력하세요.'
          min='0'
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          required
          placeholder='카테고리를 입력하세요.'
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          required
          placeholder='제품 설명을 입력하세요.'
          onChange={handleChange}
        />
        <input
          type='text'
          name='option'
          value={product.option ?? ''}
          required
          placeholder='상품 옵션은 (,)로 구분해 주세요'
          onChange={handleChange}
        />
        <button>등록하기</button>
      </form>
    </section>
  );
}
