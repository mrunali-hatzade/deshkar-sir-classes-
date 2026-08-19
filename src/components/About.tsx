'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
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

  const features = [
    { icon: '🏆', title: 'Proven Track Record', desc: '15+ years of consistent results with top rankers in IIT-JEE & NEET' },
    { icon: '👨‍🏫', title: 'Learn from the Master', desc: 'Direct mentorship from a renowned Physics expert with decades of experience' },
    { icon: '📚', title: 'Specialized Material', desc: 'Research-based Physics study materials & practice sets' },
    { icon: '🎯', title: 'Personalized Approach', desc: 'Small batch sizes ensuring individual attention for every student' },
    { icon: '💻', title: 'Smart Learning', desc: 'AI-powered doubt resolution & performance tracking system' },
    { icon: '🏠', title: 'Modern Infrastructure', desc: 'AC classrooms, digital labs & a well-stocked library' },
  ];

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageCol} data-animate>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/students-studying.png"
                alt="Students at United Classes"
                width={550}
                height={400}
                className={styles.mainImage}
              />
              <div className={styles.floatingCard}>
                <span className={styles.floatingNum}>15+</span>
                <span className={styles.floatingText}>Years of<br/>Excellence</span>
              </div>
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.sectionTag} data-animate>About Us</div>
            <h2 className={styles.sectionTitle} data-animate>
              Why <span className={styles.gold}>United Classes</span> is the 
              Right Choice?
            </h2>
            <p className={styles.sectionDesc} data-animate>
              At United Classes, we believe mastering Physics is the key to cracking competitive exams. 
              Our unique teaching methodology combines deep conceptual clarity with rigorous 
              problem-solving practice, ensuring our students don&apos;t just memorize formulas — they understand them deeply.
            </p>
            <div className={styles.features}>
              {features.map((f, i) => (
                <div key={i} className={styles.feature} data-animate style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
