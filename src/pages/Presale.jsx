import React, { useState, useEffect, useRef } from 'react';
import { Zap, Award, Trophy, Rocket, ChevronDown, Star, TrendingUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    
    { name: 'Presale', percentage: 25, color: '#a855f7' },
    { name: 'Liquidity', percentage: 15, color: '#f59e0b', vesting: 'Locked 12–24 months' },
    { name: 'User Rewards', percentage: 30, color: '#10b981', vesting: '0.5% every 6 months' },
    { name: 'Marketing', percentage: 10, color: '#06eef5', vesting: '12-month cliff + 24-month vesting' },
    { name: 'Treasury', percentage: 10, color: '#facc15' },
    { name: 'Team', percentage: 5, color: '#ec4899', vesting: '12-month cliff + 36-month vesting' },
    { name: 'Advisors', percentage: 5, color: '#3b82f6', vesting: '12-month cliff + 24-month vesting' },
  ];

  let cumulativePercentage = 0;
  const gradientParts = tokenomicsData.map((item) => {
    const start = cumulativePercentage;
    const end = cumulativePercentage + item.percentage;
    cumulativePercentage = end;
    return `${item.color} ${start}% ${end}%`;
  });
  const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

const roadmapData = [
    {
      quarter: 'Phase 1',
      title: 'Platform Ready & Public Launch',
      status: 'Completed',
      details: [
        'DEX Aggregator live (60+ blockchains, 10,000+ tokens)',
        'Non-custodial wallet-based swaps',
        'P2P crypto buy/sell module',
        'WalletConnect integration',
        'User dashboard & profile system',
        'Backend & transaction tracking',
        'Official public launch of Bigrock Exchange'
      ]
    },
    {
      quarter: 'Phase 2',
      title: 'Presale & Early Community',
      status: 'In Progress',
      details: [
        'Goal: Capital + Core Users',
        'BIGROCK token presale (Premium 2,000 members)',
        'Fundraise Target: $222,791',
        'Fixed Entry: $111.40 per member',
        'Community onboarding & referral activation',
        'Transparency on token allocation & vesting'
      ]
    },
    {
      quarter: 'Phase 3',
      title: 'Liquidity & Token Activation',
      status: 'Planned',
      details: [
        'Goal: Utility-driven token usage',
        'Liquidity deployment on DEX',
        'BIGROCK token DEX listing',
        'Launch price at 1.5× presale',
        'Airdrop rewards for swap transactions',
        'Users receive BIGROCK based on swap volume'
      ]
    },
    {
      quarter: 'Phase 4',
      title: 'Growth & Market Expansion',
      status: 'Planned',
      details: [
        'Goal: Scale users & volume',
        'Focus: Singapore, USA, Turkey, Nigeria, India, Indonesia, Brazil',
        'Strategic partnerships (wallets, protocols)',
        'Influencer & ecosystem marketing',
        'P2P agent onboarding & liquidity programs',
        'Volume-based incentives & analytics'
      ]
    }
  ];

  const faqData = [
    {
      question: 'What is the BigRock token?',
      answer: 'BigRock is the native utility token of the BigRock ecosystem. It is used for governance, staking, paying transaction fees, and accessing exclusive features within our decentralized exchange.'
    },
    {
      question: 'How can I participate in the presale?',
      answer: 'To participate, connect your cryptocurrency wallet (like MetaMask) to this page. Then, enter the amount of USDT you wish to contribute, and our platform will automatically calculate the amount of SONIC you will receive. Finally, confirm the transaction in your wallet.'
    },
    {
      question: 'What happens after the presale ends?',
      answer: 'After the presale concludes, the BigRock token will be listed on our decentralized exchange and other partner exchanges. You will be able to claim your purchased tokens according to the vesting schedule outlined in our whitepaper.'
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
          <h1 className={styles.title}>BIGROCK Token Presale</h1>
          <div className={styles.premium}>
            <Star size={18} className={styles.premiumIcon} />
            <span>Early Access: Limited to First <b>2,000</b> Members</span>
          </div>
          <p className={styles.subtitle}>Join the future of decentralized exchange.</p>
        </header>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Presale is Live!</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
              <div className="flex flex-col items-center px-6 py-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,238,245,0.15)]">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">Current Price</span>
                <span className="text-2xl font-bold text-white">$0.12</span>
              </div>
              <div className="flex flex-col items-center px-6 py-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <div className="flex items-center gap-2 mb-1"><TrendingUp size={14} className="text-emerald-400" /><span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Launch Price</span></div>
                <span className="text-2xl font-bold text-white">$0.45</span>
              </div>
            </div>
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
              <label htmlFor="sonic" className={styles.inputLabel}>You will receive (BIGROCK)</label>
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

        <div className="w-full mt-12">
          <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
              Bigrock Exchange Tokenomics
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              {/* Chart */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                <div className="absolute inset-0 rounded-full opacity-75 blur-lg" style={{ background: conicGradient }}></div>
                <div className="relative w-full h-full rounded-full shadow-2xl" style={{ background: conicGradient }}>
                  <div className="absolute inset-4 bg-gray-900 rounded-full flex flex-col items-center justify-center z-10 shadow-inner">
                    <span className="text-fuchsia-400 text-sm font-extrabold tracking-widest uppercase mb-1">Total Supply</span>
                    <span className="text-2xl md:text-3xl font-black text-white">10,000,000,000</span>
                    <span className="text-yellow-400 text-sm font-extrabold mt-1">$BIGROCK</span>
                  </div>
                </div>
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-1 gap-4 w-full">
                {tokenomicsData.map((item) => (
                  <div key={item.name} className="group relative bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: item.color, color: item.color }}></div>
                        <span className="font-semibold text-gray-200">{item.name}</span>
                      </div>
                      <span className="font-bold text-xl" style={{ color: item.color }}>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-125" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                    </div>
                    {item.vesting && (
                      <div className="flex items-center gap-2 mt-3 text-xs font-medium text-gray-400 bg-black/20 py-2 px-3 rounded-lg border border-gray-700/30 w-fit">
                        <Lock size={12} className="text-gray-500" />
                        <span className="text-gray-300">{item.vesting}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                  <ul className="space-y-2 mt-3">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-1.5 text-[6px] flex-shrink-0">●</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
       <div className={styles.buttons}>
          <Link to="" className={styles.primaryButton}>Whitepaper</Link>
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