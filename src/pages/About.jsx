import React from 'react';
import { Target, Zap, ShieldCheck, Users, Rocket } from 'lucide-react';
import styles from './About.module.css';
 
 function About() {
  

  return (
    <div className={`${styles.pageWrapper} min-h-screen p-4 md:p-8`}>
      <div className={`${styles.container} w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12`}>
        <header className={`${styles.header} text-center`}>
          <h1 className={`${styles.title} text-3xl md:text-5xl font-bold mb-4 text-[#06eef5]`}>About BIGROCK</h1>
          <p className={`${styles.subtitle} text-base md:text-lg text-gray-400 max-w-2xl mx-auto`}>
            Your gateway to a seamless, efficient, and secure decentralized experience. We are building the future of digital interaction, one block at a time.
          </p>
        </header>

        <div className={`${styles.mainImage} w-full max-w-[800px] mx-auto aspect-video rounded-2xl overflow-hidden relative z-10`}>
            <img src="/heroCardImages/poster1.png" alt="BigRock Exchange Logo" className={`${styles.logoImage} w-full h-full object-cover`} />

        </div>

        <div className={`${styles.contentGrid} grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`}>
          <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
            <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><Target size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Our Mission</h2>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
              To empower users with robust, intuitive, and accessible decentralized tools. We foster a community where innovation and user-centric design create unparalleled value and opportunity for everyone.
            </p>
          </div>
          <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
            <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><Zap size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Cutting-Edge Tech</h2>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
              Our platform is built with a focus on performance, security, and scalability. We leverage the latest advancements to ensure you have a fast, reliable, and future-proof experience every time.
            </p>
          </div>
          <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
            <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><ShieldCheck size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Security First</h2>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
              Your security is our top priority. We employ multi-layered security protocols and continuous auditing to protect your assets and data, giving you peace of mind in the decentralized world.
            </p>
          </div>
          <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
            <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><Users size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Community Driven</h2>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
              Sonic is built for and by its community. We are committed to transparency and actively listen to user feedback to guide our development and shape the future of the ecosystem together.
            </p>
          </div>
        </div>

        <div className={`${styles.teamSection} mt-12 md:mt-20 text-center`}>
          <h2 className={`${styles.teamTitle} text-2xl md:text-4xl font-bold mb-6 text-[#06eef5]`}>Join the Journey</h2>
          <p className={`${styles.teamText} text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed`}>
            Thank you for being a part of the BigRock story. We are a passionate team of builders and visionaries excited to grow with our community and redefine what's possible.
          </p>
        </div>

      
      </div>
    </div>
  );
 }
 

 export default About;