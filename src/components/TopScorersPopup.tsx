'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TopScorersPopup.module.css';

export default function TopScorersPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show on page reload
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // Show after 1 second
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openTopScorers', handleOpen);
    return () => window.removeEventListener('openTopScorers', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
        <div className={styles.header}>
          <h2>🏆 Our Physics Top Scorers 🏆</h2>
          <p>Inspiring excellence in JEE & NEET</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image 
                src="/images/topper_aarav.png" 
                alt="Aarav Patel" 
                width={70} 
                height={70} 
                className={styles.topperImage}
              />
            </div>
            <h4>Aarav Patel</h4>
            <span className={styles.exam}>IIT-JEE Advanced</span>
            <span className={styles.rank}>AIR 45</span>
          </div>
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image 
                src="/images/topper_riya.png" 
                alt="Riya Sharma" 
                width={70} 
                height={70} 
                className={styles.topperImage}
              />
            </div>
            <h4>Riya Sharma</h4>
            <span className={styles.exam}>NEET (UG)</span>
            <span className={styles.rank}>710/720</span>
          </div>
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image 
                src="/images/topper_vikram.png" 
                alt="Vikram Singh" 
                width={70} 
                height={70} 
                className={styles.topperImage}
              />
            </div>
            <h4>Vikram Singh</h4>
            <span className={styles.exam}>IIT-JEE Main</span>
            <span className={styles.rank}>99.98 %ile</span>
          </div>
        </div>
        <button className={styles.ctaBtn} onClick={() => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
          Join the League
        </button>
      </div>
    </div>
  );
}
