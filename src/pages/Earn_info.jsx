import React, { useState, useEffect, useRef } from 'react';
import styles from './Info.module.css'; // Reusing styles from Info.jsx
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import {
  FaWallet,
  FaUsers,
  FaExchangeAlt,
  FaUserFriends,
  FaRocket,
  FaCalendarAlt,
  FaPlayCircle,
  FaCogs,
  FaGift,
} from 'react-icons/fa';

function Earn_info() {
    const participationSteps = [
        { icon: <FaWallet />, title: 'Connect Your Wallet', description: 'Connect your wallet to check your eligibility for the airdrop.' },
        { icon: <FaUsers />, title: 'Complete Social Tasks', description: 'Follow our social media channels and join the community to earn points.' },
        { icon: <FaExchangeAlt />, title: 'Bridge Assets', description: 'Bridge assets to the BigRock network to get a multiplier on your points.' },
        { icon: <FaUserFriends />, title: 'Refer Friends', description: 'Invite your friends to join the airdrop and earn bonus points for each successful referral.' },
    ];

    const airdropTimelineSteps = [
        { icon: <FaPlayCircle />, title: 'Phase 1: Social Tasks & Early Participation', description: 'Currently active!' },
        { icon: <FaCogs />, title: 'Phase 2: On-chain Interaction', description: 'Coming Soon' },
        { icon: <FaGift />, title: 'Token Claim', description: 'To be announced after the campaign concludes.' },
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
    const airdropTimeline = useInteractiveTimeline(airdropTimelineSteps);

    return (
        <div className={styles['info-page-container']}>
            <div className={styles['page-header']}>
                <Link to="/airdrop" className={styles['back-button']}>
                    <IoArrowBackCircleOutline size={40} />
                </Link>
                <h1 className={styles['info-header']}>BigRock Airdrop Is Live!</h1>
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

                <div className={styles.sectionHeader} style={{ marginTop: '60px' }}>
                    <div className={`${styles.headerIconWrapper} ${styles.buyIcon}`}>
                        <FaCalendarAlt />
                    </div>
                    <h2>Airdrop Timeline</h2>
                </div>
                <div className={`${styles.timeline} ${styles.buyTimeline}`} ref={airdropTimeline.timelineRef}>
                    <div className={styles['timeline-progress-line']} style={{ height: airdropTimeline.progressHeight }}></div>
                    {airdropTimelineSteps.map((step, index) => (
                        <div key={`airdrop-${index}`} className={styles['timeline-item']} ref={airdropTimeline.itemRefs.current[index]}>
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

export default Earn_info;