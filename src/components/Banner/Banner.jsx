import React from 'react';
import styles from './Banner.module.css';
import AutoPlayMethods from './slick';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <AutoPlayMethods />
      <div className={styles.text}>
        <h2>
          Do you <span className={styles.span}>NEED</span> shoes?
        </h2>
        <h3>
          Here are the shoes your <span className={styles.span}>NEED!</span>
        </h3>
      </div>
    </section>
  );
}
