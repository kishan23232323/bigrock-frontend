 import React, { useState, useEffect, useRef } from 'react';
import styles from './Info.module.css';
 function Info() {
  const buySteps = [
    { title: 'Create an Account', description: 'Sign up and complete the verification process.' },
    { title: 'Deposit Funds', description: 'Connect your bank account or transfer crypto to your new wallet.' },
    { title: 'Navigate to Trade', description: 'Go to the "Trade" or "Market" page and select the cryptocurrency you wish to buy.' },
    { title: 'Place Your Order', description: 'Enter the amount you want to purchase and confirm the transaction. Your new assets will appear in your wallet.' },
  ];

  const sellSteps = [
    { title: 'Select the Asset', description: 'Go to your wallet and choose the cryptocurrency you want to sell.' },
    { title: 'Choose the Amount', description: 'Enter the amount of the asset you wish to sell.' },
    { title: 'Review and Confirm', description: 'Check the transaction details, including fees and the total amount you will receive.' },
    { title: 'Complete the Sale', description: 'Confirm the sale. The funds will be credited to your account balance.' },
  ];

  // Custom hook to manage the interactive timeline logic
  const useInteractiveTimeline = (items) => {
    const timelineRef = useRef(null);
    const itemRefs = useRef([]);
    const [progressHeight, setProgressHeight] = useState('0px');

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
              const newHeight = (itemRect.top - timelineRect.top) + 35 + 10; // 35px top for dot, 10px for half dot height
              setProgressHeight(`${newHeight}px`);
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
      <h1 className={styles['info-header']}>Information</h1>
      
      <div>
        {/* --- How to Buy Timeline --- */}
        <h2 className={styles['info-header']} style={{ fontSize: '2rem', marginTop: '20px' }}>How to Buy</h2>
        <div className={styles.timeline} ref={buyTimeline.timelineRef}>
          <div className={styles['timeline-progress-line']} style={{ height: buyTimeline.progressHeight }}></div>
          {buySteps.map((step, index) => (
            <div key={`buy-${index}`} className={styles['timeline-item']} ref={buyTimeline.itemRefs.current[index]}>
              <div className={styles['timeline-dot']}></div>
              <section className={styles['info-section']}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </section>
            </div>
          ))}
        </div>

        {/* --- How to Sell Timeline --- */}
        <h2 className={styles['info-header']} style={{ fontSize: '2rem', marginTop: '60px' }}>How to Sell</h2>
        <div className={styles.timeline} ref={sellTimeline.timelineRef}>
          <div className={styles['timeline-progress-line']} style={{ height: sellTimeline.progressHeight }}></div>
          {sellSteps.map((step, index) => (
            <div key={`sell-${index}`} className={styles['timeline-item']} ref={sellTimeline.itemRefs.current[index]}>
              <div className={styles['timeline-dot']}></div>
              <section className={styles['info-section']}>
                <h3>{step.title}</h3>
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