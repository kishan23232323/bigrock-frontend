import React from 'react';
import { Target, Zap, ShieldCheck, Users, Rocket } from 'lucide-react';
import styles from './About.module.css';
 
 function About() {
  

  return (
    <div className={`${styles.pageWrapper} min-h-screen p-4 md:p-8`}>
      <div className={`${styles.container} w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12`}>
        <header className={`${styles.header} text-center`}>
          <h1 className={`${styles.title} text-3xl md:text-5xl font-bold mb-4 text-[#06eef5]`}>About BIGROCK</h1>
          <p className={`${styles.subtitle} text-base md:text-lg text-gray-400 max-w-2xl mx-auto`}>
            Your gateway to a seamless, efficient, and secure decentralized experience. We are building the future of digital interaction, one block at a time.
          </p>
        </header>

        <div className={`${styles.mainImage} w-full max-w-[800px] mx-auto aspect-video rounded-2xl overflow-hidden relative z-10`}>
            <img src="/heroCardImages/poster1.png" alt="BigRock Exchange Logo" className={`${styles.logoImage} w-full h-full object-cover`} />

        </div>

        <div className="w-full flex flex-col gap-8 md:gap-12">
          {/* What we do Card */}
          <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`${styles.iconWrapper} text-[#06eef5]`}><Zap size={32} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-2xl md:text-3xl font-bold text-cyan-400`}>What we do</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-cyan-300">One place for many chains and tokens</h3>
                <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                  Trade across dozens of blockchains and thousands of tokens without juggling multiple apps or bridges. Our platform uses smart routing technology to find fast, cost‑efficient paths for swaps, so users can move value between chains with minimal friction. We integrate with advanced routing tools designed for multi‑chain swaps, giving us access to broad liquidity and optimized routes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-cyan-300">P2P you’ll actually want to use</h3>
                <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                  A friendly, straightforward peer‑to‑peer section lets users buy, sell, and transfer with real people, using familiar payment methods — designed to feel clear and trustworthy even for first‑time P2P users.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-cyan-300">Earn while you participate</h3>
                <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                  Community growth is rewarded. Users earn BigRock tokens through referrals and by swapping — turning everyday activity into long‑term upside.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-cyan-300">True non‑custodial security</h3>
                <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                  Users keep full control of their keys and funds. Transactions execute directly from users’ wallets, aligning with the core ethos of decentralized finance.
                </p>
              </div>
            </div>
          </div>

          {/* Other Cards Grid */}
          <div className={`${styles.contentGrid} grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`}>
            <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
              <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><Target size={28} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Why it matters</h2>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                Today’s crypto ecosystem spans many chains, each with its own communities and liquidity. But switching between them often means confusing bridges, delays, or hidden fees. BigRock Exchange removes those barriers. Whether someone wants to swap quickly, help a friend buy or sell in P2P, or build value over time through rewards and referrals, the platform brings all of that together — without giving up control of funds or adding unnecessary steps.
              </p>
            </div>
            <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
              <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><Rocket size={28} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Our Vision</h2>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed mb-3`}>
                We’re building a universal gateway for decentralized trading, where users can:
              </p>
              <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
                <li>Seamlessly explore and access opportunities across the crypto world,</li>
                <li>Grow with the platform through rewards and community participation,</li>
                <li>Trust that their funds remain under their control.</li>
              </ul>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed mt-4`}>
                By combining broad chain support, smart routing, a friendly P2P experience, and token-based incentives, BigRock Exchange aims to be the default hub for multi-chain DeFi activity — not just for advanced traders, but for anyone ready to join the crypto economy on their own terms.
              </p>
            </div>
            <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
              <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><Users size={28} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>Presale Note</h2>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                A limited premium presale is available for the first 2,000 users, with a fixed launch price and a 12-month vesting period. It’s a special opportunity to join early, support the platform, and participate in its growth from day one.
              </p>
            </div>
            <div className={`${styles.featureCard} bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300`}>
              <div className={`${styles.iconWrapper} mb-4 text-[#06eef5]`}><ShieldCheck size={28} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-cyan-400`}>A Quick Reminder</h2>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed`}>
                Crypto and DeFi carry risks, including market volatility and technical risks. We encourage users to review the platform’s documentation, terms, and risk disclosures, and to trade responsibly.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.teamSection} mt-12 md:mt-20 text-center`}>
          <h2 className={`${styles.teamTitle} text-2xl md:text-4xl font-bold mb-6 text-[#06eef5]`}>Join the Journey</h2>
          <p className={`${styles.teamText} text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed`}>
            Thank you for being a part of the BigRock story. We are a passionate team of builders and visionaries excited to grow with our community and redefine what's possible.
          </p>
        </div>

      
      </div>
    </div>
  );
 }
 

 export default About;