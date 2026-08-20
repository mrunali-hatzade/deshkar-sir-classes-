'use client';
import styles from './Atom3D.module.css';

export default function Atom3D() {
  return (
    <div className={styles.atomContainer}>
      <div className={styles.nucleus}></div>
      <div className={`${styles.orbit} ${styles.orbit1}`}>
        <div className={styles.electron}></div>
      </div>
      <div className={`${styles.orbit} ${styles.orbit2}`}>
        <div className={styles.electron}></div>
      </div>
      <div className={`${styles.orbit} ${styles.orbit3}`}>
        <div className={styles.electron}></div>
      </div>
    </div>
  );
}
