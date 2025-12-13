import React, { useState, useEffect, useRef } from 'react';
import styles from './Info.module.css'; // Reusing styles from Info.jsx
import { GrFormPrevious  } from "react-icons/gr";
import { Link } from 'react-router-dom';

function Earn_info() {
    const participationSteps = [
        { title: 'Connect Your Wallet', description: 'Connect your wallet to check your eligibility for the airdrop.' },
        { title: 'Complete Social Tasks', description: 'Follow our social media channels and join the community to earn points.' },
        { title: 'Bridge Assets', description: 'Bridge assets to the Sonic network to get a multiplier on your points.' },
        { title: 'Refer Friends', description: 'Invite your friends to join the airdrop and earn bonus points for each successful referral.' },
    ];

    const airdropTimelineSteps = [
        { title: 'Phase 1: Social Tasks & Early Participation', description: 'Currently active!' },
        { title: 'Phase 2: On-chain Interaction', description: 'Coming Soon' },
        { title: 'Token Claim', description: 'To be announced after the campaign concludes.' },
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
                    <GrFormPrevious size={32} />
                </Link>
                <h1 className={styles['info-header']}>Sonic Airdrop Is Live!</h1>
            </div>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ccc' }}>Complete tasks to earn your share of SONIC tokens.</p>

            <div>
                <h2 className={styles['info-header']} style={{ fontSize: '2rem', marginTop: '20px' }}>How to Participate</h2>
                <div className={styles.timeline} ref={participationTimeline.timelineRef}>
                    <div className={styles['timeline-progress-line']} style={{ height: participationTimeline.progressHeight }}></div>
                    {participationSteps.map((step, index) => (
                        <div key={`participate-${index}`} className={styles['timeline-item']} ref={participationTimeline.itemRefs.current[index]}>
                            <div className={styles['timeline-dot']}></div>
                            <section className={styles['info-section']}><h3>{step.title}</h3><p>{step.description}</p></section>
                        </div>
                    ))}
                </div>

                <h2 className={styles['info-header']} style={{ fontSize: '2rem', marginTop: '60px' }}>Airdrop Timeline</h2>
                <div className={styles.timeline} ref={airdropTimeline.timelineRef}>
                    <div className={styles['timeline-progress-line']} style={{ height: airdropTimeline.progressHeight }}></div>
                    {airdropTimelineSteps.map((step, index) => (
                        <div key={`airdrop-${index}`} className={styles['timeline-item']} ref={airdropTimeline.itemRefs.current[index]}>
                            <div className={styles['timeline-dot']}></div>
                            <section className={styles['info-section']}><h3>{step.title}</h3><p>{step.description}</p></section>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Earn_info;