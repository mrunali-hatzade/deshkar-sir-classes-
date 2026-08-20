'use client';
import { useEffect, useRef } from 'react';

import styles from './Courses.module.css';

export default function Courses() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const courses = [
    {
      icon: '🚀',
      title: 'Physics for IIT-JEE',
      tag: 'Most Popular',
      duration: '2 Years',
      classes: 'Class 11-12',
      price: '₹75,000',
      pricePeriod: '/ year',
      desc: 'Master Physics concepts and advanced problem-solving techniques for India\'s toughest engineering entrance.',
      features: ['Mechanics & Electromagnetism', 'Weekly mock tests', 'Doubt clearing sessions', 'Study material included'],
      color: '#ffd700',
    },
    {
      icon: '🩺',
      title: 'Physics for NEET',
      tag: 'High Demand',
      duration: '2 Years',
      classes: 'Class 11-12',
      price: '₹70,000',
      pricePeriod: '/ year',
      desc: 'Expert-led medical entrance coaching with focus on NCERT mastery and competitive edge in Physics.',
      features: ['Thermodynamics & Optics', 'NCERT-based approach', 'Regular assessments', 'Conceptual clarity'],
      color: '#00bfff',
    },
    {
      icon: '💡',
      title: 'Physics Crash Course',
      tag: 'Intensive',
      duration: '3-6 Months',
      classes: 'Class 11-12',
      price: '₹25,000',
      pricePeriod: ' full course',
      desc: 'Intensive short-term programs for last-minute exam preparation with rapid revision of key Physics topics.',
      features: ['Concentrated syllabus', 'Daily tests', 'Rapid revision', 'Formula memorization tricks'],
      color: '#ff9800',
    },
  ];

  return (
    <section id="courses" className={styles.courses} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.tag}>Our Programs</span>
          <h2 className={styles.title}>
            Courses Designed for <span className={styles.gold}>Success</span>
          </h2>
          <p className={styles.desc}>
            From foundation building to competitive exam mastery — we offer comprehensive 
            programs tailored to every student&apos;s academic journey.
          </p>
        </div>

        <div className={styles.grid}>
          {courses.map((course, i) => (
            <div 
              key={i} 
              className={styles.card} 
              data-animate 
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at top right, ${course.color}15, transparent 70%)` }}></div>
              <div className={styles.cardTop}>
                <span className={styles.cardIcon} style={{ background: `${course.color}18` }}>{course.icon}</span>
                <span className={styles.cardTag} style={{ background: `${course.color}20`, color: '#1a1a2e' }}>{course.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{course.title}</h3>
              <div className={styles.cardPriceContainer}>
                <span className={styles.cardPrice} style={{ color: '#e65100' }}>{course.price}</span>
                <span className={styles.cardPricePeriod}>{course.pricePeriod}</span>
              </div>
              <div className={styles.cardMeta}>
                <span>⏱ {course.duration}</span>
                <span>📖 {course.classes}</span>
              </div>
              <p className={styles.cardDesc}>{course.desc}</p>
              <ul className={styles.cardFeatures}>
                {course.features.map((f, j) => (
                  <li key={j}><span className={styles.check}>✓</span> {f}</li>
                ))}
              </ul>
              <a href="#contact" className={styles.cardBtn} style={{ background: `linear-gradient(135deg, #0056b3, #004494)` }}>
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
