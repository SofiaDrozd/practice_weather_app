import React from 'react';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const cities = ['Чернігів', 'Чернігів', 'Чернігів', 'Чернігів', 'Чернігів'];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Міста</h2>
      <hr className={styles.divider} />

      <ul className={styles.cityList}>
        {cities.map((city, index) => (
          <li key={index} className={styles.cityItem}>
            <span className={styles.locationIcon}>📍</span>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;