import React from 'react';
import { Briefcase, HeartHandshake, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Career.module.css';
 
 function Career() {
  const jobOpenings = [

    {
      title: 'College/University Ambassador',
      department: 'Marketing',
      location: 'Remote',
      isOpen: true,
    },

    {
      title: 'Senior Blockchain Engineer',
      department: 'Engineering',
      location: 'Remote',
      isOpen: false,
    },
    {
      title: 'Frontend Developer (React)',
      department: 'Engineering',
      location: 'Remote',
      isOpen: false,
    },
    {
      title: 'Head of Community',
      department: 'Marketing',
      location: 'Global / Remote',
      isOpen: false,
    },
    {
      title: 'Product Manager - DeFi',
      department: 'Product',
      location: 'Remote',
      isOpen: false,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={`${styles.header} flex flex-col items-center text-center mb-12 md:mb-16`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6 shadow-[0_0_10px_rgba(6,238,245,0.15)]">
            <Sparkles size={16} />
            <span>JOIN THE REVOLUTION</span>
          </div>
          <h1 className={`${styles.title} text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#06eef5] via-cyan-400 to-blue-500`}>
            Work With Us
          </h1>
          <p className={`${styles.subtitle} text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed`}>
            Join our mission to build the future of decentralized finance. We're a passionate, global team pushing the boundaries of what's possible.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Join BIGROCK?</h2>
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
          {jobOpenings.length > 0 ? (
            <div className={styles.jobList}>
              {jobOpenings.map((job, index) => (
                <div key={index} className={styles.jobCard}>
                  <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p className={styles.jobDetails}>{job.department} &middot; {job.location}</p>
                  </div>
                  <a
                   href={`mailto:support@bigrock.exchange?subject=Job Application for ${encodeURIComponent(
                    job.title
                  )}&body=Hello BigRock Team,%0D%0A%0D%0AI want to apply for the position: ${encodeURIComponent(
                    job.title
                  )}.%0D%0A%0D%0APlease attach your CV and contact information with this mail.%0D%0A%0D%0ARegards,%0D%0A`}

                  >
                                      <button 
                    className={`${styles.applyButton} ${!job.isOpen ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    disabled={!job.isOpen}
                    // onClick={() => navigate('/apply', { state: { job } })}
                  >
                    {job.isOpen ? 'Apply Now' : 'Closed'}
                  </button>

                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-gray-900/30 border border-gray-800">
              <p className="text-gray-400 text-lg">There are currently no open positions. Please check back later.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
 }
 

 export default Career;