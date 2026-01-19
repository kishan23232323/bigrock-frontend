import React, { useState, useEffect, useRef } from 'react';
import styles from './Info.module.css'; // Reusing styles from Info.jsx
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import {
  FaWallet,
  FaUsers,
  FaUserFriends,
  FaRocket,
} from 'react-icons/fa';

function Earn_info() {
    const participationSteps = [
        { icon: <FaWallet />, title: 'Connect Your Wallet', description: 'Connect your wallet to claim your $BRK tokens .' },
        { icon: <FaUsers />, title: 'Community to stay updated', description: 'Follow our social media channels and join the community to earn $BRK tokens .' },
        { icon: <FaUserFriends />, title: 'Refer Friends', description: 'Invite your friends to join the airdrop and earn $BRK tokens for each successful referral.' },
    ];

    // Custom hook to manage the interactive timeline logic
    const useInteractiveTimeline = (items) => {
        const timelineRef = useRef(null);
        const itemRefs = useRef([]);
        const [progressHeight, setProgressHeight] = useState('0px');

        useEffect(() => {
            itemRefs.current = Array(items.length).fill().map((_, i) => itemRefs.current[i] || React.createRef());

            const observer = new IntersectionObserver(
                (entries) => {
                    let maxVisibleIndex = -1;

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(styles['is-visible']);
                            const index = parseInt(entry.target.dataset.index, 10);
                            maxVisibleIndex = Math.max(maxVisibleIndex, index);
                        }
                    });

                    if (maxVisibleIndex !== -1 && itemRefs.current[maxVisibleIndex]?.current) {
                        const timelineEl = timelineRef.current;
                        const currentItemEl = itemRefs.current[maxVisibleIndex].current;
                        if (timelineEl && currentItemEl) {
                            const timelineRect = timelineEl.getBoundingClientRect();
                            const itemRect = currentItemEl.getBoundingClientRect();
                            const newHeight = (itemRect.top - timelineRect.top) + 35 + 10; // 35px top for dot, 10px for half dot height
                            setProgressHeight(`${newHeight}px`);
                        }
                    }
                },
                { threshold: 0.3 }
            );

            itemRefs.current.forEach((ref, index) => {
                if (ref.current) {
                    ref.current.dataset.index = index;
                    observer.observe(ref.current);
                }
            });

            return () => itemRefs.current.forEach(ref => ref.current && observer.unobserve(ref.current));
        }, [items]);

        return { timelineRef, itemRefs, progressHeight };
    };

    const participationTimeline = useInteractiveTimeline(participationSteps);

    return (
        <div className={styles['info-page-container']}>
            <div className={`${styles['page-header']} flex flex-col md:flex-row items-center justify-center relative w-full mb-8 md:mb-12`}>
                <Link to="/airdrop" className={`${styles['back-button']} self-start md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 mb-4 md:mb-0`}>
                    <IoArrowBackCircleOutline size={40} />
                </Link>
                <h1 className={`${styles['info-header']} text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06eef5] via-cyan-400 to-purple-500 
                drop-shadow-[0_0_25px_rgba(6,238,245,0.4)] tracking-tight leading-tight text-center`}>
                    Earn Guide
                </h1>
            </div>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ccc' }}>Complete tasks to earn your share of BIGROCK tokens.</p>

            <div>
                <div className={styles.sectionHeader} style={{ marginTop: '40px' }}>
                    <div className={styles.headerIconWrapper}>
                        <FaRocket />
                    </div>
                    <h2>How to Participate</h2>
                </div>
                <div className={styles.timeline} ref={participationTimeline.timelineRef}>
                    <div className={styles['timeline-progress-line']} style={{ height: participationTimeline.progressHeight }}></div>
                    {participationSteps.map((step, index) => (
                        <div key={`participate-${index}`} className={styles['timeline-item']} ref={participationTimeline.itemRefs.current[index]}>
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
            </div>
        </div>
    );
}

export default Earn_info;