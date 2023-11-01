import React from 'react';
import { Link } from 'react-router-dom';
import { BiListPlus, BiListUl } from 'react-icons/bi';
import styles from './Navbar.module.css';
import User from '../User/User';
import { useUserContext } from '../../context/userContext';
import CartStatus from '../CartStatus/CartStatus';

export default function Navbar() {
  const { user, login, logout } = useUserContext();

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.name}>
        <h1>NEED</h1>
      </Link>
      <nav className={styles.nav}>
        <Link to='/products' className={styles.button}>
          <BiListUl />
        </Link>
        {user && (
          <Link to='/carts' className={styles.button}>
            <CartStatus />
          </Link>
        )}
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
