'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: number;
  title: string;
  category: 'classroom' | 'library' | 'lab' | 'discussion';
  description: string;
  image: string;
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'classroom' | 'library' | 'lab' | 'discussion'>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const items: GalleryItem[] = [
    {
      id: 1,
      title: 'Interactive Classrooms',
      category: 'classroom',
      description: 'Fully air-conditioned classrooms equipped with smart projectors, whiteboards, and ergonomic desks to optimize concentration.',
      image: '/images/gallery_classroom.png'
    },
    {
      id: 2,
      title: 'Self-Study Library',
      category: 'library',
      description: 'A peaceful, distraction-free environment packed with key textbooks, study sheets, and private cubicles for individual focus.',
      image: '/images/gallery_library.png'
    },
    {
      id: 3,
      title: 'Practical Physics Lab',
      category: 'lab',
      description: 'Equipped with precision instruments and modern setups to validate complex formulas through real-world experimentation.',
      image: '/images/gallery_lab.png'
    },
    {
      id: 4,
      title: 'Doubt & Discussion Rooms',
      category: 'discussion',
      description: 'Dedicated spaces for group discussion, peer study, and 1-on-1 personalized doubt resolution sessions with teachers.',
      image: '/images/gallery_discussion.png'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.tag}>Infrastructure</span>
          <h2 className={styles.title}>
            Our Learning <span className={styles.gold}>Environments</span>
          </h2>
          <p className={styles.subtitle}>
            Explore our state-of-the-art facilities designed to build deep conceptual mastery and support student success.
          </p>
        </div>

        <div className={styles.filterBar} data-animate>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Facilities
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'classroom' ? styles.active : ''}`}
            onClick={() => setActiveFilter('classroom')}
          >
            Classrooms
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'library' ? styles.active : ''}`}
            onClick={() => setActiveFilter('library')}
          >
            Study Library
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'lab' ? styles.active : ''}`}
            onClick={() => setActiveFilter('lab')}
          >
            Science Labs
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'discussion' ? styles.active : ''}`}
            onClick={() => setActiveFilter('discussion')}
          >
            Discussion Rooms
          </button>
        </div>

        <div className={styles.grid}>
          {filteredItems.map((item, i) => (
            <div 
              key={item.id} 
              className={styles.card} 
              data-animate
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.imageContainer}>
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
