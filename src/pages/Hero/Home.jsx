import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const cardInfo = [
  {
    imageSrc: "/heroCardImages/instantMultiChainSwaps.png",
    title: "Instant Multi-Chain Swaps",
    subtext:
      "Execute cross-chain swaps in seconds. No bridges, no waiting. Powered by Rubic routing.",
  },
  {
    imageSrc: "/heroCardImages/Over80Blockchains.png",
    title: "80+ Blockchains Supported",
    subtext:
      "From Ethereum to Solana, Polygon to Avalanche. Trade any token on any chain from one interface.",
  },
  {
    imageSrc: "/heroCardImages/earnAirdrops.png",
    title: "Earn Airdrops for Swaps",
    subtext:
      "Every swap earns you points. Climb tiers to unlock airdrops, boost rewards, and perks.",
  },
  {
    imageSrc: "/heroCardImages/secure.png",
    title: "Secure & Non-Custodial",
    subtext:
      "Your keys, your crypto. Swaps execute directly from your wallet with battle-tested security.",
  },
];

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.bgAnimation}>
        <div className={styles.gridPattern} />
      </div>

      <section className={styles.heroSection}>
        <div className={styles.heroTop}>
          <div className={styles.content}>
            <div className={styles.eyebrow}>SONIC EXCHANGE • MULTICHAIN DEFI</div>

            <div className={styles.titleWrap}>
              <h1 className={styles.title}>Next-Gen Cross-Chain Swapping</h1>
              <p className={styles.titleSub}>One Platform. Every Chain.</p>
            </div>

            <p className={styles.subtext}>
              Swap, trade, and earn across 80+ blockchains from a single
              decentralized interface. Experience true multichain freedom.
            </p>


          </div>


          {/* Removed RubicWidget */}
          {/* <div className={styles.widgetWrapper}>
            <RubicWidget />
          </div> */}
        </div>
        <div className={styles.buttons}>
          <Link to="/presale" className={styles.primaryButton}>Presale</Link>

        </div>

        <div className={styles.cardsSection}>
          <h2 className={styles.sectionTitle}>Why Sonic Exchange</h2>
          <div className={styles.cardsGrid}>
            {cardInfo.map((card, index) => (
              <div key={index} className={styles.card}>
                <img src={card.imageSrc} alt={card.title} />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          <Link to="" className={styles.primaryButton}>whitepaper</Link>

        </div>
      </section>

    </div>
  );
};

export default Home;
