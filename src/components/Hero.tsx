'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';



const PARTICLES = [
  { left: '5%', delay: '0.2s', duration: '4.5s' },
  { left: '12%', delay: '1.5s', duration: '6s' },
  { left: '20%', delay: '3s', duration: '5s' },
  { left: '28%', delay: '0.8s', duration: '3.8s' },
  { left: '35%', delay: '2.1s', duration: '6.5s' },
  { left: '42%', delay: '4s', duration: '4.2s' },
  { left: '50%', delay: '1.2s', duration: '5.5s' },
  { left: '58%', delay: '3.4s', duration: '3.5s' },
  { left: '65%', delay: '0.5s', duration: '6.2s' },
  { left: '72%', delay: '2.7s', duration: '4.8s' },
  { left: '80%', delay: '1.8s', duration: '5.2s' },
  { left: '88%', delay: '3.9s', duration: '4s' },
  { left: '95%', delay: '0.9s', duration: '6.8s' },
  { left: '15%', delay: '2.5s', duration: '5.8s' },
  { left: '30%', delay: '4.2s', duration: '3.9s' },
  { left: '48%', delay: '0.4s', duration: '6.1s' },
  { left: '62%', delay: '1.9s', duration: '4.6s' },
  { left: '76%', delay: '3.1s', duration: '5.4s' },
  { left: '84%', delay: '2.3s', duration: '6.3s' },
  { left: '92%', delay: '4.7s', duration: '3.7s' },
];

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
        alt="Deshkar Sir's Classes"
        fill
        priority
        className={styles.bgImage}
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.particles}>
        {PARTICLES.map((p, i) => (
          <div key={i} className={styles.particle} style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}></div>
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.badge} data-animate>
          ⭐ Rated #1 Coaching Institute in the Region
        </div>
        <h1 className={styles.title} data-animate>
          Shape Your <span className={styles.highlight}>Future</span> with<br />
          <span className={styles.highlight2}>Deshkar Sir&apos;s Classes</span>
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
