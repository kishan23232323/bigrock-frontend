import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Send, CheckCircle, Briefcase } from 'lucide-react';
import styles from './JobApplication.module.css';

export default function JobApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (!job) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className="text-center text-gray-400 mt-20">
            <h2 className="text-2xl font-bold mb-4">No position selected</h2>
            <button onClick={() => navigate('/career')} className={styles.backButton}>
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.pageWrapper}>
        <div className={`${styles.container} flex items-center justify-center min-h-[60vh]`}>
          <div className="bg-gray-900/50 backdrop-blur-xl border border-emerald-500/30 p-8 md:p-12 rounded-3xl text-center max-w-lg w-full shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Application Sent!</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Thanks for applying to be a <span className="text-emerald-400 font-semibold">{job.title}</span>. We've received your details and will be in touch soon.
            </p>
            <button onClick={() => navigate('/career')} className={styles.primaryButton}>
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backLink}>
          <ArrowLeft size={20} />
          <span>Back to Positions</span>
        </button>

        <div className={styles.formCard}>
          <div className={styles.header}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Briefcase size={14} />
              <span>{job.department}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Apply for {job.title}</h1>
            <p className="text-gray-400">{job.location}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input type="text" placeholder="Jane" required className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input type="text" placeholder="Doe" required className={styles.input} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="jane@example.com" required className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label>LinkedIn / Portfolio URL</label>
              <input type="url" placeholder="https://linkedin.com/in/..." className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label>Resume / CV</label>
              <div className={styles.fileUpload}>
                <Upload size={24} className="text-cyan-400 mb-2" />
                <span className="text-gray-300 font-medium">Click to upload or drag and drop</span>
                <span className="text-gray-500 text-sm mt-1">PDF, DOCX up to 10MB</span>
                <input type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Why do you want to join BigRock?</label>
              <textarea rows="4" placeholder="Tell us a bit about yourself..." className={styles.textarea}></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit Application <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}