import React from 'react';
import { Target, Zap, ShieldCheck, Users, Rocket, ArrowLeftRight, Star } from 'lucide-react';
import styles from './About.module.css';
import { Link } from 'react-router-dom';
 
 function About() {
  

  return (
    <div className={`${styles.pageWrapper} min-h-screen p-4 md:p-8`}>
      <div className={`${styles.container} w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12`}>
        <header className={`${styles.header} text-center`}>
          <h1 className={`${styles.title} text-3xl md:text-5xl font-bold mb-4 text-[#06eef5]`}>BIGROCK</h1>
          <p className={`${styles.subtitle} text-base md:text-lg text-gray-400 max-w-2xl mx-auto text-justify`}>
            Your gateway to a seamless, efficient, and secure decentralized experience. We are building the future of digital interaction, one block at a time.
          </p>
        </header>

        <Link to="/presale" className={`${styles.mainImage} w-full max-w-[800px] mx-auto aspect-video rounded-2xl overflow-hidden relative z-10`}>
            <img src="/heroCardImages/poster1.png" alt="BigRock Exchange Logo" className={`${styles.logoImage} w-full h-full object-cover`} />
        </Link>

        <div className="w-full flex flex-col gap-8 md:gap-12">
          {/* What we do Card */}
          <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-cyan-900/20 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(6,238,245,0.1)]`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`${styles.iconWrapper} text-[#06eef5]`}><Zap size={32} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-2xl md:text-3xl font-bold text-cyan-400`}>What We Do</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="text-cyan-400 flex-shrink-0 mt-1"><ArrowLeftRight size={24} /></div>
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300 mb-2">Trade Everywhere</h3>
                  <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
                    Trade tokens across blockchains effortlessly. We find the fastest, cheapest routes so you don't have to.
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="text-cyan-400 flex-shrink-0 mt-1"><Users size={24} /></div>
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300 mb-2">Simple P2P</h3>
                  <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
                    Buy and sell directly with real people. It’s safe, easy, and works with payment methods you know.
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="text-cyan-400 flex-shrink-0 mt-1"><Star size={24} /></div>
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300 mb-2">Earn Rewards</h3>
                  <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
                    Get rewarded for trading and bringing friends. Earn BigRock tokens just by being part of the community.
                  </p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="flex gap-4">
                <div className="text-cyan-400 flex-shrink-0 mt-1"><ShieldCheck size={24} /></div>
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300 mb-2">Your Keys, Your Crypto</h3>
                  <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
                    You stay in full control. Trade directly from your wallet with no middleman holding your funds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Vision Card */}
          <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-emerald-900/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]`}>
            <div className={`${styles.iconWrapper} mb-4 text-emerald-400`}><Rocket size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-emerald-300`}>Our Vision</h2>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed mb-3 text-justify`}>
              We’re building a universal gateway for decentralized trading, where users can:
            </p>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Seamlessly explore and access opportunities across the crypto world,</li>
              <li>Grow with the platform through rewards and community participation,</li>
              <li>Trust that their funds remain under their control.</li>
            </ul>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed mt-4 text-justify`}>
              By combining broad chain support, smart routing, a friendly P2P experience, and token-based incentives, BigRock Exchange aims to be the default hub for multi-chain DeFi activity — not just for advanced traders, but for anyone ready to join the crypto economy on their own terms.
            </p>
          </div>

          {/* Other Cards Grid */}
          <div className={`${styles.contentGrid} grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`}>
            <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]`}>
              <div className={`${styles.iconWrapper} mb-4 text-purple-400`}><Target size={28} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-purple-300`}>Why It Matters</h2>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
                Crypto can be messy with so many chains and bridges. We make it simple. Swap, trade P2P, and earn rewards in one secure place—no headaches, just smooth trading.
              </p>
            </div>
            <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-amber-900/20 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]`}>
              <div className={`${styles.iconWrapper} mb-4 text-amber-400`}><Users size={28} className={styles.icon} /></div>
              <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-amber-300`}>Presale Note</h2>
              <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
                Be an early supporter. Join our limited presale for the first 2,000 users to get a fixed price and be part of our growth story from the start.
              </p>
            </div>
            
          </div>
        </div>

        <div className={`${styles.teamSection} mt-12 md:mt-20 text-center`}>
          <h2 className={`${styles.teamTitle} text-2xl md:text-4xl font-bold mb-6 text-[#06eef5]`}>Join the Journey</h2>
          <p className={`${styles.teamText} text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed text-justify`}>
            Thank you for being a part of the BIGROCK story. We are a passionate team of builders and visionaries excited to grow with our community and redefine what's possible.
          </p>
        </div>

      
      </div>
    </div>
  );
 }
 

 export default About;