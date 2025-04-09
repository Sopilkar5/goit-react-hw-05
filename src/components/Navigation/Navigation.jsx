import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.navigation}>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink 
          to="/movies" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;