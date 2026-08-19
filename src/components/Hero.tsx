'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.bgOverlay}></div>
      <Image
        src="/images/hero-banner.png"
        alt="United Classes Coaching"
        fill
        priority
        className={styles.bgImage}
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}></div>
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.badge} data-animate>
          ⭐ Rated #1 Coaching Institute in the Region
        </div>
        <h1 className={styles.title} data-animate>
          Shape Your <span className={styles.highlight}>Future</span> with<br />
          <span className={styles.highlight2}>United Classes</span>
        </h1>
        <p className={styles.subtitle} data-animate>
          Premier coaching for IIT-JEE &amp; NEET Physics. Learn directly from the master,
          experience proven methodology, and join our track record of top rankers year after year.
        </p>
        <div className={styles.ctas} data-animate>
          <a href="#courses" className={styles.primaryBtn}>
            Explore Courses
            <span className={styles.btnArrow}>→</span>
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Book Free Demo
          </a>
        </div>
        <div className={styles.stats} data-animate>
          <div className={styles.stat}>
            <span className={styles.statNum}>15+</span>
            <span className={styles.statLabel}>Years of Excellence</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>10K+</span>
            <span className={styles.statLabel}>Students Trained</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>95%</span>
            <span className={styles.statLabel}>Success Rate</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>500+</span>
            <span className={styles.statLabel}>Top Rankers</span>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
