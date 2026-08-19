'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Aarav Patel',
      role: 'IIT Bombay, AIR 12',
      text: 'United Classes transformed my preparation journey. The faculty\'s approach to problem-solving and their constant support helped me achieve what I once thought was impossible. The structured study plan and regular tests kept me on track throughout.',
      rating: 5,
    },
    {
      name: 'Priya Gupta',
      role: 'AIIMS Delhi, AIR 28',
      text: 'The biology and chemistry faculty here are exceptional. They make complex concepts so simple that learning becomes enjoyable. The test series and doubt sessions were game-changers for my NEET preparation.',
      rating: 5,
    },
    {
      name: 'Rohit Kumar',
      role: 'IIT Delhi, AIR 45',
      text: 'I joined United Classes in my foundation years and it was the best decision. The teachers not only prepared me for JEE but also built my analytical thinking skills. The mentorship program gave me clarity about my goals.',
      rating: 5,
    },
    {
      name: 'Mrs. Sunita Sharma',
      role: 'Parent of Kavya Sharma',
      text: 'As a parent, I was looking for a coaching that cares about students beyond just marks. United Classes provides a nurturing environment where children can thrive. My daughter scored 99.2% in boards thanks to their guidance.',
      rating: 5,
    },
    {
      name: 'Arjun Singh',
      role: 'IIT Kanpur, AIR 89',
      text: 'The competitive environment at United Classes pushes you to give your best. The faculty is always accessible, even outside class hours. Their mock tests are incredibly close to the actual exam pattern.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.tag}>Student Voices</span>
          <h2 className={styles.title}>
            What Our <span className={styles.gold}>Students Say</span>
          </h2>
        </div>

        <div className={styles.carousel} data-animate>
          <div className={styles.quoteIcon}>&ldquo;</div>
          <div className={styles.slideContent}>
            <p className={styles.quoteText}>{testimonials[activeIndex].text}</p>
            <div className={styles.stars}>
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <h4 className={styles.quoteName}>{testimonials[activeIndex].name}</h4>
            <span className={styles.quoteRole}>{testimonials[activeIndex].role}</span>
          </div>

          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.miniCards} data-animate>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`${styles.miniCard} ${i === activeIndex ? styles.activeMini : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className={styles.miniAvatar}>
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h5>{t.name}</h5>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
