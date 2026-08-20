'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '', phone: '', email: '', course: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormState({ name: '', phone: '', email: '', course: '', message: '' });
      } else {
        console.error('Registration failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.infoCol} data-animate>
            <span className={styles.tag}>Get in Touch</span>
            <h2 className={styles.title}>
              Start Your Journey to <span className={styles.gold}>Success</span>
            </h2>
            <p className={styles.desc}>
              Ready to take the first step? Reach out to us for a free counseling 
              session and demo class. Our team is here to guide you.
            </p>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>📍</span>
                <div>
                  <h4>Visit Us</h4>
                  <p>Deshkar Sir&apos;s Classes, Bhandara</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>📞</span>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 9623896600</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>✉️</span>
                <div>
                  <h4>Email Us</h4>
                  <p>info@deshkarsirclasses.com<br/>admissions@deshkarsirclasses.com</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>⏰</span>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 7:00 AM - 9:00 PM<br/>Sunday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            <div className={styles.mapSection}>
              <h4 className={styles.mapTitle}>📍 Find Us on Map</h4>
              <div className={styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.8!2d79.65!3d21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhandara%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1692000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Deshkar Sir's Classes Location - Bhandara"
                ></iframe>
              </div>
              <a
                href="https://www.google.com/maps/search/Deshkar+Sir+Classes+Bhandara+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsBtn}
              >
                🗺️ Get Directions
              </a>
            </div>
          </div>

          <div className={styles.formCol} data-animate>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3>Register for Demo Class</h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-name">Full Name</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    placeholder="Your full name" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input 
                    id="contact-phone"
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX" 
                    value={formState.phone}
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.inputGroup + ' ' + styles.fullWidth}>
                  <label htmlFor="contact-email">Email Address</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    placeholder="your@email.com" 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.inputGroup + ' ' + styles.fullWidth}>
                  <label htmlFor="contact-course">Select Course</label>
                  <select 
                    id="contact-course"
                    value={formState.course}
                    onChange={e => setFormState({...formState, course: e.target.value})}
                    required
                  >
                    <option value="">Choose a course...</option>
                    <option value="Physics for IIT-JEE">Physics for IIT-JEE</option>
                    <option value="Physics for NEET">Physics for NEET</option>
                    <option value="Physics Crash Course">Physics Crash Course</option>
                  </select>
                </div>
                <div className={styles.inputGroup + ' ' + styles.fullWidth}>
                  <label htmlFor="contact-message">Message (Optional)</label>
                  <textarea 
                    id="contact-message"
                    placeholder="Tell us about your goals..." 
                    rows={4}
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>
                {submitted ? '✓ Registration Successful!' : 'Register Now →'}
              </button>
              <p className={styles.formNote}>📞 We&apos;ll contact you within 24 hours</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
