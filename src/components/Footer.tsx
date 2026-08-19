import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z" fill="rgba(10,15,30,1)"/>
        </svg>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>
              <span className={styles.brandIcon}>🎓</span>
              <h3>United Classes</h3>
            </div>
            <p className={styles.desc}>
              Empowering students to achieve academic excellence since 2010. 
              Your success is our mission.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="YouTube">▶️</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Our Courses</h4>
            <ul>
              <li><a href="#courses">IIT-JEE Preparation</a></li>
              <li><a href="#courses">NEET Coaching</a></li>
              <li><a href="#courses">Foundation (8-10)</a></li>
              <li><a href="#courses">Board Exam Prep</a></li>
              <li><a href="#courses">Olympiad Training</a></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Contact Info</h4>
            <ul className={styles.contactList}>
              <li>📍 United Classes, Bhandara</li>
              <li>📞 +91 9623896600</li>
              <li>✉️ info@unitedclasses.edu</li>
              <li>⏰ Mon - Sat: 7:00 AM - 9:00 PM</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2024 United Classes. All Rights Reserved. | Designed with ❤️ for Education</p>
        </div>
      </div>
    </footer>
  );
}
