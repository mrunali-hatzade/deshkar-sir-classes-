'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Deshkar Sir&apos;s Classes</span>
            <span className={styles.logoTagline}>Excellence in Education</span>
          </div>
        </Link>

        <Link href="/admin" className={styles.adminBtn} title="Admin Panel">
          ⚙️ Admin
        </Link>

        <button 
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><Link href="/#home" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link href="/#courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
          <li><Link href="/#results" onClick={() => setMenuOpen(false)}>Results</Link></li>
          <li><Link href="/resources" onClick={() => setMenuOpen(false)}>Resources</Link></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openTopScorers')); setMenuOpen(false); }}>Hall of Fame 🏆</a></li>
          <li><Link href="/#gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li><Link href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
          <li><Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link href="/#contact" className={styles.ctaBtn} onClick={() => setMenuOpen(false)}>Enroll Now</Link></li>
        </ul>
      </div>
    </nav>
  );
}
