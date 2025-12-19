 import React, { useState, useEffect, useRef } from 'react';
import styles from './Info.module.css';
import { Link } from 'react-router-dom';
import {
  FaSignInAlt,
  FaGlobe,
  FaMoneyBillWave,
  FaCreditCard,
  FaPaperPlane,
  FaFileUpload,
  FaCheckCircle,
  FaUserPlus,
  FaWallet,
  FaUniversity,
  FaCheckDouble,
  FaArrowCircleUp,
  FaArrowCircleDown,
  
} from 'react-icons/fa';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

 function Info() {
    const buySteps = [
      { icon: <FaUserPlus />, title: 'Create & Verify Account', description: 'Create and verify your account before placing an order.' },
      { icon: <FaGlobe />, title: 'Select Your Country', description: 'Select your country to view supported sellers and payment options.' },
      { icon: <FaMoneyBillWave />, title: 'Enter USDT Amount', description: 'Enter the USDT amount you wish to purchase.' },
      { icon: <FaWallet />, title: 'Provide Wallet Address', description: 'Provide your correct USDT wallet address to receive the funds.' },
      { icon: <FaCreditCard />, title: 'Select Payment Method', description: 'Select a payment method (UPI / Bank Transfer / PayPal).' },
      { icon: <FaUniversity />, title: 'Deposit Funds', description: 'Deposit the amount to the seller using the given payment details.' },
      { icon: <FaFileUpload />, title: 'Upload Proof', description: 'Upload a clear screenshot of the successful payment.' },
      { icon: <FaCheckDouble />, title: 'Submit Order', description: 'Submit the order for verification and processing. 🔒 Safety Tip: Make payment only through the app-provided details.' },
    ];

    const sellSteps = [
      { icon: <FaSignInAlt />, title: 'Login', description: 'Create or log in to your account.' },
      { icon: <FaGlobe />, title: 'Select Country', description: 'Select your country to view available options.' },
      { icon: <FaMoneyBillWave />, title: 'Enter Sell Amount', description: 'Enter the amount of USDT you want to sell.' },
      { icon: <FaCreditCard />, title: 'Choose Payment Method', description: 'Choose a payment method (Bank Transfer / PayPal) to receive funds.' },
      { icon: <FaPaperPlane />, title: 'Send USDT', description: 'Send USDT to the secure wallet address provided by the platform.' },
      { icon: <FaFileUpload />, title: 'Submit Proof', description: 'Upload payment proof and the transaction hash (TxID).' },
      { icon: <FaCheckCircle />, title: 'Final Check', description: '⚠️ Make sure all details are correct before submission.' },
    ];

  // Custom hook to manage the interactive timeline logic
  const useInteractiveTimeline = (items) => {
    const timelineRef = useRef(null);
    const itemRefs = useRef([]);
    const [progressHeight, setProgressHeight] = useState('0');

    useEffect(() => {
      // Create refs for each timeline item if they don't exist
      itemRefs.current = Array(items.length).fill().map((_, i) => itemRefs.current[i] || React.createRef());

      const observer = new IntersectionObserver(
        (entries) => {
          let maxVisibleIndex = -1;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add the 'is-visible' class to trigger the animation
              entry.target.classList.add(styles['is-visible']);
              const index = parseInt(entry.target.dataset.index, 10);
              maxVisibleIndex = Math.max(maxVisibleIndex, index);
            }
          });

          // Update the progress line height based on the last visible item
          if (maxVisibleIndex !== -1 && itemRefs.current[maxVisibleIndex]?.current) {
            const timelineEl = timelineRef.current;
            const currentItemEl = itemRefs.current[maxVisibleIndex].current;
            if (timelineEl && currentItemEl) {
              const timelineRect = timelineEl.getBoundingClientRect();
              const itemRect = currentItemEl.getBoundingClientRect();
              // Calculate height to the center of the dot
              const newHeight = (itemRect.top - timelineRect.top) + (itemRect.height / 2);
              setProgressHeight(`${newHeight}`);
            }
          }
        },
        { threshold: 0.3 } // Trigger when 30% of the item is visible
      );

      // Observe each timeline item
      itemRefs.current.forEach((ref, index) => {
        if (ref.current) {
          ref.current.dataset.index = index;
          observer.observe(ref.current);
        }
      });

      // Cleanup observer on component unmount
      return () => itemRefs.current.forEach(ref => ref.current && observer.unobserve(ref.current));
    }, [items]);

    return { timelineRef, itemRefs, progressHeight };
  };

  const buyTimeline = useInteractiveTimeline(buySteps);
  const sellTimeline = useInteractiveTimeline(sellSteps);

  return (
    <div className={styles['info-page-container']}>
      <div className={styles['page-header']}>
        <Link to="/p2p" className={styles['back-button']}>
          <IoArrowBackCircleOutline size={40} />
        </Link>
        <h1 className={styles['info-header']}>
          Information
        </h1>
      </div>
      <div>
        {/* --- How to Sell USDT (P2P) --- */}
        <div className={styles.sectionHeader} style={{ marginTop: '20px' }}>
          <div className={styles.headerIconWrapper}>
            <FaArrowCircleUp />
          </div>
          <h2>How to Sell USDT (P2P)</h2>
        </div>
        <div className={styles.timeline} ref={sellTimeline.timelineRef}>
          <div className={styles['timeline-progress-line']} style={{ height: `${sellTimeline.progressHeight}px` }}></div>
          {sellSteps.map((step, index) => (
            <div key={`sell-${index}`} className={styles['timeline-item']} ref={sellTimeline.itemRefs.current[index]}>
              <div className={styles['timeline-dot']}></div>
              <section className={styles['info-section']}>
                <div className={styles.sectionTitleContainer}>
                  <div className={styles['timeline-icon-wrapper']}>{step.icon}</div>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
              </section>
            </div>
          ))}
        </div>

        {/* --- P2P Buying Guidelines --- */}
        <div className={styles.sectionHeader} style={{ marginTop: '60px' }}>
          <div className={`${styles.headerIconWrapper} ${styles.buyIcon}`}>
            <FaArrowCircleDown />
          </div>
          <h2>P2P Buying Guidelines</h2>
        </div>
        <div className={`${styles.timeline} ${styles.buyTimeline}`} ref={buyTimeline.timelineRef}>
          <div className={styles['timeline-progress-line']} style={{ height: `${buyTimeline.progressHeight}px` }}></div>
          {buySteps.map((step, index) => (
            <div key={`buy-${index}`} className={styles['timeline-item']} ref={buyTimeline.itemRefs.current[index]}>
              <div className={styles['timeline-dot']}></div>
              <section className={styles['info-section']}>
                <div className={styles.sectionTitleContainer}>
                  <div className={`${styles['timeline-icon-wrapper']} ${styles.buyIconWrapper}`}>{step.icon}</div>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
 }
 

 export default Info;