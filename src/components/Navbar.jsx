import React from 'react';
import { Link } from 'react-router-dom';
import { BiListPlus, BiSolidCart, BiListUl } from 'react-icons/bi';

export default function Navbar() {
  return (
    <header>
      <Link to='/'>
        <h1>NEED</h1>
      </Link>
      <nav>
        <Link to='/products'>
          products
          <BiListUl />
        </Link>
        <Link to='/carts'>
          carts
          <BiSolidCart />
        </Link>
        <Link to='/products/new'>
          new
          <BiListPlus />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
