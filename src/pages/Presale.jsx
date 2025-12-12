import React, { useState, useEffect, useRef } from 'react';
import { Zap, Award, Trophy, Rocket, ChevronDown } from 'lucide-react';
import styles from './Presale.module.css';
 
 function Presale() {
  const [usdtAmount, setUsdtAmount] = useState('');
  const [sonicAmount, setSonicAmount] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Set a target sale start date in the future
    const saleStartDate = new Date('2025-12-25T10:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleStartDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null); // Or set a "Sale is Live" state
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleUsdtChange = (e) => {
    const value = e.target.value;
    setUsdtAmount(value);
    // Example conversion: 1 USDT = 10 SONIC
    setSonicAmount(value ? parseFloat(value) * 10 : '');

    // Trigger glow animation
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 700); // Match animation duration
  };

  const presaleProgress = 75; // 75%

  const tokenomicsData = [
    { name: 'MARKETING', percentage: 40 },
    { name: 'MAXI FUND', percentage: 25 },
    { name: 'DEV', percentage: 15 },
    { name: 'LIQUIDITY', percentage: 15 },
    { name: 'STAKING', percentage: 5 },
  ];

  const utilityData = [
    {
      icon: <Award size={24} className={styles.utilityIcon} />,
      title: 'Staking Rewards',
      description: '$MAXI rewards pool with daily smart contract distribution.',
    },
    {
      icon: <Trophy size={24} className={styles.utilityIcon} />,
      title: '$MAXI Contests',
      description: 'Community activations & rewards for top ROI hunters.',
    },
    {
      icon: <Zap size={24} className={styles.utilityIcon} />,
      title: 'Partner Events',
      description: 'Futures platform integrations & gamified tournaments.',
    },
  ];

  const pieChartColors = ['#06eef5', '#00ffa3', '#22d3ee', '#67e8f9', '#a7f3d0'];

  let cumulativePercentage = 0;
  const gradientParts = tokenomicsData.map((item, index) => {
    const start = cumulativePercentage;
    const end = cumulativePercentage + item.percentage;
    cumulativePercentage = end;
    return `${pieChartColors[index % pieChartColors.length]} ${start}% ${end}%`;
  });
  const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;
const roadmapData = [
    {
      quarter: 'Q4 2025',
      title: 'Project Inception & Whitepaper',
      status: 'Completed',
      details: 'Initial concept, team formation, and drafting the foundational whitepaper outlining Sonic\'s vision.'
    },
    {
      quarter: 'Q1 2026',
      title: 'Token Presale & DEX Launch',
      status: 'In Progress',
      details: 'Conducting the public presale event and launching the core decentralized exchange on the mainnet.'
    },
    {
      quarter: 'Q2 2026',
      title: 'Advanced Trading Features',
      status: 'Planned',
      details: 'Integration of limit orders, advanced charting tools, and expanded asset support.'
    },
    {
      quarter: 'Q3 2026',
      title: 'Governance & Staking V2',
      status: 'Planned',
      details: 'Launching the governance DAO and introducing enhanced staking and yield farming opportunities.'
    }
  ];

  const faqData = [
    {
      question: 'What is the SONIC token?',
      answer: 'SONIC is the native utility token of the Sonic ecosystem. It is used for governance, staking, paying transaction fees, and accessing exclusive features within our decentralized exchange.'
    },
    {
      question: 'How can I participate in the presale?',
      answer: 'To participate, connect your cryptocurrency wallet (like MetaMask) to this page. Then, enter the amount of USDT you wish to contribute, and our platform will automatically calculate the amount of SONIC you will receive. Finally, confirm the transaction in your wallet.'
    },
    {
      question: 'What happens after the presale ends?',
      answer: 'After the presale concludes, the SONIC token will be listed on our decentralized exchange and other partner exchanges. You will be able to claim your purchased tokens according to the vesting schedule outlined in our whitepaper.'
    },
    {
      question: 'Is my investment secure?',
      answer: 'Security is our top priority. Our smart contracts have been rigorously audited by leading third-party security firms. However, as with any cryptocurrency investment, there are inherent risks. We encourage you to do your own research.'
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const timelineItemRefs = useRef([]);
  const [timelineProgressHeight, setTimelineProgressHeight] = useState('0px');
  const [visibleTimelineIndex, setVisibleTimelineIndex] = useState(null);

  useEffect(() => {
    // Ensure refs are created for each item
    timelineItemRefs.current = Array(roadmapData.length).fill().map((_, i) => timelineItemRefs.current[i] || React.createRef());

    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibleIndex = -1;
        let intersectingIndex = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            // Trigger fade-in animation
            if (entry.target.style.animationPlayState === 'paused') {
              entry.target.style.animationPlayState = 'running';
            }
            maxVisibleIndex = Math.max(maxVisibleIndex, index);
            if (entry.intersectionRatio > 0.5) intersectingIndex = index;
          }
        });

        setVisibleTimelineIndex(intersectingIndex);
        if (maxVisibleIndex !== -1 && timelineItemRefs.current[maxVisibleIndex] && timelineItemRefs.current[maxVisibleIndex].current) {
          const currentItemRef = timelineItemRefs.current[maxVisibleIndex].current;
          const timelineContainer = currentItemRef.closest(`.${styles.timeline}`);
          if (timelineContainer) {
            const containerRect = timelineContainer.getBoundingClientRect();
            const itemRect = currentItemRef.getBoundingClientRect();

            // Calculate the center of the dot relative to the timeline container
            // The dot is inside timelineConnector, which is inside timelineItem
            // The dot itself has a margin-top: 5px and is 16px height, so center is 5 + 16/2 = 13px from item top
            const dotCenterRelativeToItemTop = 5 + (16 / 2);
            const dotTopRelativeToContainer = itemRect.top - containerRect.top + dotCenterRelativeToItemTop;

            setTimelineProgressHeight(`${dotTopRelativeToContainer}px`);
          }
        } else if (maxVisibleIndex === -1) {
            // If no items are intersecting, reset or set to initial 'In Progress'
            const firstActiveIndex = roadmapData.findIndex(item => item.status === 'In Progress' || item.status === 'Completed');
            if (firstActiveIndex !== -1 && timelineItemRefs.current[firstActiveIndex] && timelineItemRefs.current[firstActiveIndex].current) {
                const currentItemRef = timelineItemRefs.current[firstActiveIndex].current;
                const timelineContainer = currentItemRef.closest(`.${styles.timeline}`);
                if (timelineContainer) {
                    const containerRect = timelineContainer.getBoundingClientRect();
                    const itemRect = currentItemRef.getBoundingClientRect();
                    const dotCenterRelativeToItemTop = 5 + (16 / 2);
                    const dotTopRelativeToContainer = itemRect.top - containerRect.top + dotCenterRelativeToItemTop;
                    setTimelineProgressHeight(`${dotTopRelativeToContainer}px`);
                }
            } else {
                setTimelineProgressHeight('0px'); // No active items, no progress line
            }
        }
      },
      { threshold: [0.2, 0.5, 0.8] } // More thresholds for smoother progress update
    );

    timelineItemRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.index = index;
        observer.observe(ref.current);
      }
    });

    return () => {
      timelineItemRefs.current.forEach(ref => ref.current && observer.unobserve(ref.current));
    };
  }, [roadmapData]); // Depend on roadmapData to re-run if it changes

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Sonic Token Presale</h1>
          <h1 className={styles.premium}>(Premium only for First 200 member)</h1>
          <p className={styles.subtitle}>Join the future of decentralized exchange.</p>
        </header>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Stage 2 is Live!</h2>
            <span className={styles.priceBadge}>1 SONIC = $0.12</span>
          </div>

          {timeLeft && (
            <div className={styles.countdownContainer}>
              <h3 className={styles.countdownTitle}>Sale Starts In</h3>
              <div className={styles.countdownTimer}>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{timeLeft.days}</span>
                  <span className={styles.timeLabel}>Days</span>
                </div>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{timeLeft.hours}</span>
                  <span className={styles.timeLabel}>Hours</span>
                </div>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{timeLeft.minutes}</span>
                  <span className={styles.timeLabel}>Minutes</span>
                </div>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{timeLeft.seconds}</span>
                  <span className={styles.timeLabel}>Seconds</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.progressContainer}>
            <div className={styles.progressInfo}>
              <div>
                <span>Progress</span>
                <span className={styles.hurryTag}>Selling Fast!</span>
              </div>
              <span>{presaleProgress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${presaleProgress}%` }}></div>
            </div>
            <div className={styles.progressLabels}>
              <span>Raised: $1,500,000</span>
              <span>Target: $2,000,000</span>
            </div>
          </div>

          <div className={styles.buyForm}>
            <div>
              <label htmlFor="usdt" className={styles.inputLabel}>Amount in USDT</label>
              <input
                id="usdt"
                type="number"
                value={usdtAmount}
                onChange={handleUsdtChange}
                placeholder="0.00"
                className={styles.inputField}
              />
            </div>
            <div>
              <label htmlFor="sonic" className={styles.inputLabel}>You will receive (SONIC)</label>
              <input
                id="sonic"
                type="text"
                value={sonicAmount}
                readOnly
                placeholder="0.00"
                className={`${styles.inputField} ${isCalculating ? styles.inputGlow : ''}`}
              />
            </div>
          </div>

          <button className={styles.buyButton}>
            <Zap size={20} style={{ marginRight: '8px' }} />
            Connect Wallet & Buy
          </button>
        </div>

        <div className={styles.infoGrid}>
          {/* Tokenomics Card */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Tokenomics</h2>
            <div className={styles.pieChartContainer}>
              <div className={styles.pieChart} style={{ background: conicGradient }}></div>
              <div className={styles.legend}>
                {tokenomicsData.map((item, index) => (
                  <div key={item.name} className={styles.legendItem}>
                    <div
                      className={styles.legendColorBox}
                      style={{ backgroundColor: pieChartColors[index % pieChartColors.length] }}
                    ></div>
                    <span>{item.name}</span>
                    <span className={styles.legendPercentage}>{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Utility Card */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>$MAXI Utility</h2>
            {utilityData.map((item) => (
              <div key={item.title} className={styles.utilityItem}>{item.icon}<div><h3 className={styles.utilityTitle}>{item.title}</h3><p className={styles.utilityDescription}>{item.description}</p></div></div>
            ))}
          </div>
        </div>
          <div className={styles.roadmapSection}>
          <h2 className={styles.roadmapTitle}><Rocket size={28} /> Our Roadmap</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineProgressLine} style={{ height: timelineProgressHeight }}></div>
            {roadmapData.map((item, index) => (
              <div key={index} ref={timelineItemRefs.current[index]} className={styles.timelineItem}>
                <div className={styles.timelineConnector}>
                  <div className={`${styles.timelineDot} ${styles[`status${item.status.replace(' ', '')}`]}`}></div>
                </div>
                <div className={`
                  ${styles.timelineCard}
                  ${styles.roadmapCard}
                  ${item.status === 'In Progress' ? styles.cardInProgress : ''}
                  ${visibleTimelineIndex === index ? styles.cardVisible : ''}
                `}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineQuarter}>{item.quarter}</span>
                    <span className={`${styles.timelineStatus} ${styles[`statusText${item.status.replace(' ', '')}`]}`}>{item.status}</span>
                  </div>
                  <h3 className={styles.timelineCardTitle}>{item.title}</h3>
                  <p className={styles.timelineDetails}>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqData.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  <span>{item.question}</span>
                  <ChevronDown className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`} />
                </div>
                <div 
                  className={styles.faqAnswer}
                  style={{ maxHeight: openFaq === index ? '200px' : '0', paddingTop: openFaq === index ? '1rem' : '0' }}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

 }
 

 export default Presale;