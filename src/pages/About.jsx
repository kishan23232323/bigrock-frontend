import React from 'react';
import { Target, Zap, ShieldCheck, Users } from 'lucide-react';
import styles from './About.module.css';
 
 function About() {
  

  return (
    <div className={`${styles.pageWrapper} py-12 md:py-20`}>
      <div className={`${styles.container} px-4 sm:px-6 lg:px-8`}>
        <header className={`${styles.header} text-center`}>
          <h1 className={`${styles.title} text-4xl md:text-5xl font-bold`}>About BIGROCK</h1>
          <p className={`${styles.subtitle} max-w-3xl mx-auto mt-4 text-lg text-slate-300 md:text-xl`}>
            Your gateway to a seamless, efficient, and secure decentralized experience. We are building the future of digital interaction, one block at a time.
          </p>
        </header>

        <div className={`${styles.mainImage} my-12 md:my-16`} style={{ width: "100%", maxWidth: "800px", height: "auto" }}>
            <img src="/heroCardImages/poster1.png" alt="BigRock Exchange Logo" className={`${styles.logoImage} w-full h-auto rounded-lg shadow-2xl`} style={{ width: "100%", height: "auto" }} />

        </div>

        <div className={`${styles.contentGrid} grid grid-cols-1 md:grid-cols-2 gap-8`}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Target size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-2xl font-semibold`}>Our Mission</h2>
            <p className={styles.cardText}>
              To empower users with robust, intuitive, and accessible decentralized tools. We foster a community where innovation and user-centric design create unparalleled value and opportunity for everyone.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Zap size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-2xl font-semibold`}>Cutting-Edge Tech</h2>
            <p className={styles.cardText}>
              Our platform is built with a focus on performance, security, and scalability. We leverage the latest advancements to ensure you have a fast, reliable, and future-proof experience every time.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><ShieldCheck size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-2xl font-semibold`}>Security First</h2>
            <p className={styles.cardText}>
              Your security is our top priority. We employ multi-layered security protocols and continuous auditing to protect your assets and data, giving you peace of mind in the decentralized world.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Users size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-2xl font-semibold`}>Community Driven</h2>
            <p className={styles.cardText}>
              Sonic is built for and by its community. We are committed to transparency and actively listen to user feedback to guide our development and shape the future of the ecosystem together.
            </p>
          </div>
        </div>

        <div className={`${styles.teamSection} mt-12 md:mt-16 text-center`}>
          <h2 className={`${styles.teamTitle} text-3xl md:text-4xl font-bold`}>Join the Journey</h2>
          <p className={`${styles.teamText} max-w-3xl mx-auto mt-4 text-lg text-slate-300 md:text-xl`}>
            Thank you for being a part of the BigRock story. We are a passionate team of builders and visionaries excited to grow with our community and redefine what's possible.
          </p>
        </div>

      
      </div>
    </div>
  );
 }
 

 export default About;