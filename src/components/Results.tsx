'use client';
import { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import styles from './Results.module.css';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Results() {
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

  const toppers = [
    { name: 'Aarav Patel', rank: 'AIR 12', exam: 'IIT-JEE Advanced 2024', score: '342/360' },
    { name: 'Priya Gupta', rank: 'AIR 28', exam: 'NEET 2024', score: '715/720' },
    { name: 'Rohit Kumar', rank: 'AIR 45', exam: 'IIT-JEE Advanced 2024', score: '335/360' },
    { name: 'Sneha Reddy', rank: 'AIR 7', exam: 'NEET 2024', score: '718/720' },
    { name: 'Arjun Singh', rank: 'AIR 89', exam: 'IIT-JEE Advanced 2024', score: '320/360' },
    { name: 'Kavya Sharma', rank: 'State Topper', exam: 'CBSE Class 12 2024', score: '99.2%' },
  ];

  return (
    <section id="results" className={styles.results} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.tag}>Our Achievements</span>
          <h2 className={styles.title}>
            Results That <span className={styles.gold}>Speak</span> for Themselves
          </h2>
        </div>

        <div className={styles.counters} data-animate>
          <div className={styles.counter}>
            <div className={styles.counterNum}><AnimatedCounter target={523} suffix="+" /></div>
            <div className={styles.counterLabel}>IIT-JEE Selections</div>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}><AnimatedCounter target={412} suffix="+" /></div>
            <div className={styles.counterLabel}>NEET Qualifiers</div>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}><AnimatedCounter target={95} suffix="%" /></div>
            <div className={styles.counterLabel}>Success Rate</div>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}><AnimatedCounter target={38} /></div>
            <div className={styles.counterLabel}>Top 100 Rankers</div>
          </div>
        </div>

        <div className={styles.toppersGrid}>
          {toppers.map((topper, i) => (
            <div key={i} data-animate style={{ transitionDelay: `${i * 0.1}s` }}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={800}
                scale={1.03}
                transitionSpeed={1000}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffd700"
                glarePosition="all"
                glareBorderRadius="16px"
              >
                <div className={styles.topperCard}>
                  <div className={styles.topperAvatar}>
                    {topper.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={styles.topperInfo}>
                    <h4>{topper.name}</h4>
                    <span className={styles.topperExam}>{topper.exam}</span>
                  </div>
                  <div className={styles.topperRank}>
                    <span className={styles.rankValue}>{topper.rank}</span>
                    <span className={styles.rankScore}>{topper.score}</span>
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>

        <div className={styles.actionContainer} data-animate>
          <button 
            className={styles.viewAllBtn}
            onClick={() => window.dispatchEvent(new Event('openTopScorers'))}
          >
            View Hall of Fame Gallery 🏆
          </button>
        </div>
      </div>
    </section>
  );
}
