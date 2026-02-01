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
         
        </header>

         <div className=" md:ml-40 md:-mb-66 md:-mt-10 ml-20 -mb-50 -mt-36 w-full   flex justify-center items-center rounded-3xl overflow-hidden">
          <img src="/logo.png" alt="BigRock Exchange Logo" className="w-[550px] h-[550px] md:w-[600px] md:h-[600px] object-contain rounded-3xl" />
        </div>





        <div className="w-full flex flex-col gap-8 md:gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-cyan-900/10 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 md:p-8 hover:border-cyan-500/40 transition-all duration-300`}>
              <div className="mb-4 text-[#06eef5]"><Zap size={32} /></div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">Next-Gen Trading</h2>
              <p className="text-gray-400 leading-relaxed text-justify">
               Bigrock Exchange is a next-generation crypto trading platform offering a powerful DEX aggregator that supports 60+ blockchains and 10,000+ tokens. Built for speed, security, and simplicity, Bigrock enables seamless multi-chain swaps and efficient trading through a user-friendly, non-custodial infrastructure designed for global users.
              </p>
            </div>

            <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-purple-900/10 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 md:p-8 hover:border-purple-500/40 transition-all duration-300`}>
              <div className="mb-4 text-purple-400"><ArrowLeftRight size={32} /></div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">P2P & Ecosystem</h2>
              <p className="text-gray-400 leading-relaxed text-justify">
                Our platform also enables peer-to-peer (P2P) trading, allowing users to buy and sell crypto directly with real people using trusted payment methods. With rewards, airdrops, and community incentives, BigRock empowers users to trade, earn, and grow in a fully non-custodial ecosystem.
              </p>
            </div>
          </div>

          <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06eef5] to-transparent opacity-50"></div>
            <p className="text-lg md:text-xl text-gray-300 font-medium italic">
              "We are building the future of decentralized finance — one block at a time."
            </p>
          </div>

          {/* What we do Card */}
          <div className={`${styles.featureCard} bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-amber-900/20 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]`}>
            <div className={`${styles.iconWrapper} mb-4 text-amber-400`}><Users size={28} className={styles.icon} /></div>
            <h2 className={`${styles.cardTitle} text-xl md:text-2xl font-bold mb-2 text-amber-300`}>Presale Note</h2>
            <p className={`${styles.cardText} text-gray-400 leading-relaxed text-justify`}>
              Be an early supporter. Join our  premium limited presale for the first 2,000 users to get a fixed price and be part of our growth story from the start.
            </p>
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