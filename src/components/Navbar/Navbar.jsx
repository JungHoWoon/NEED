import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiListPlus, BiSolidCart, BiListUl } from 'react-icons/bi';
import styles from './Navbar.module.css';
import { login, logout, onUserStateChange } from '../../api/firebase';
import User from '../User/User';

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.name}>
        <h1>NEED</h1>
      </Link>
      <nav className={styles.nav}>
        <Link to='/products' className={styles.button}>
          <BiListUl />
        </Link>
        <Link to='/carts' className={styles.button}>
          <BiSolidCart />
        </Link>
        {user && user.isAdmin && (
          <Link to='/products/new' className={styles.button}>
            <BiListPlus />
          </Link>
        )}
        {user && <User user={user} />}
        <button className={styles.login} onClick={!user ? login : logout}>
          {!user ? 'Login' : 'Logout'}
        </button>
      </nav>
    </header>
  );
}
