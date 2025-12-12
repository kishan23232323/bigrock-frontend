import React from 'react';
import { Briefcase, HeartHandshake, Sparkles } from 'lucide-react';
import styles from './Career.module.css';
 
 function Career() {
  const jobOpenings = [
    {
      title: 'Senior Blockchain Engineer',
      department: 'Engineering',
      location: 'Remote',
    },
    {
      title: 'Frontend Developer (React)',
      department: 'Engineering',
      location: 'Remote',
    },
    {
      title: 'Head of Community',
      department: 'Marketing',
      location: 'Global / Remote',
    },
    {
      title: 'Product Manager - DeFi',
      department: 'Product',
      location: 'Remote',
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Work With Us</h1>
          <p className={styles.subtitle}>
            Join our mission to build the future of decentralized finance. We're a passionate, global team pushing the boundaries of what's possible.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Join Sonic?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}><Sparkles size={28} className={styles.icon} /></div>
              <h3 className={styles.benefitTitle}>Innovate & Create</h3>
              <p className={styles.benefitText}>Work on challenging problems at the forefront of Web3 and DeFi innovation.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}><HeartHandshake size={28} className={styles.icon} /></div>
              <h3 className={styles.benefitTitle}>Great Culture</h3>
              <p className={styles.benefitText}>Join a collaborative, transparent, and fully remote team that values every voice.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}><Briefcase size={28} className={styles.icon} /></div>
              <h3 className={styles.benefitTitle}>Awesome Perks</h3>
              <p className={styles.benefitText}>Enjoy competitive compensation, flexible hours, and a professional growth stipend.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          <div className={styles.jobList}>
            {jobOpenings.map((job, index) => (
              <div key={index} className={styles.jobCard}>
                <div className={styles.jobInfo}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.jobDetails}>{job.department} &middot; {job.location}</p>
                </div>
                <button className={styles.applyButton}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
 }
 

 export default Career;