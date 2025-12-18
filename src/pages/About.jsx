import React from 'react';
import { Target, Zap, ShieldCheck, Users, Rocket } from 'lucide-react';
import styles from './About.module.css';
 
 function About() {
  

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>About Sonic</h1>
          <p className={styles.subtitle}>
            Your gateway to a seamless, efficient, and secure decentralized experience. We are building the future of digital interaction, one block at a time.
          </p>
        </header>

        <div className={styles.mainImage}>
          <span>Your Image Here (e.g., 800x300)</span>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Target size={28} className={styles.icon} /></div>
            <h2 className={styles.cardTitle}>Our Mission</h2>
            <p className={styles.cardText}>
              To empower users with robust, intuitive, and accessible decentralized tools. We foster a community where innovation and user-centric design create unparalleled value and opportunity for everyone.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Zap size={28} className={styles.icon} /></div>
            <h2 className={styles.cardTitle}>Cutting-Edge Tech</h2>
            <p className={styles.cardText}>
              Our platform is built with a focus on performance, security, and scalability. We leverage the latest advancements to ensure you have a fast, reliable, and future-proof experience every time.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><ShieldCheck size={28} className={styles.icon} /></div>
            <h2 className={styles.cardTitle}>Security First</h2>
            <p className={styles.cardText}>
              Your security is our top priority. We employ multi-layered security protocols and continuous auditing to protect your assets and data, giving you peace of mind in the decentralized world.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Users size={28} className={styles.icon} /></div>
            <h2 className={styles.cardTitle}>Community Driven</h2>
            <p className={styles.cardText}>
              Sonic is built for and by its community. We are committed to transparency and actively listen to user feedback to guide our development and shape the future of the ecosystem together.
            </p>
          </div>
        </div>

        <div className={styles.teamSection}>
          <h2 className={styles.teamTitle}>Join the Journey</h2>
          <p className={styles.teamText}>
            Thank you for being a part of the Sonic story. We are a passionate team of builders and visionaries excited to grow with our community and redefine what's possible.
          </p>
        </div>

      
      </div>
    </div>
  );
 }
 

 export default About;