import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import RubicWidget from "../../components/Widget/RubicWidget";

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
            <div className={styles.eyebrow}>
              BigRock EXCHANGE
              <br />
              The universal multi-chain decentralized exchange.
            </div>
            

            <div className={styles.titleWrap}>
              <h1 className={styles.title}>
                Swap  <span className={styles.highlight}>100+</span> blockchains & <span className={styles.highlight}>15,000+</span> tokens
              </h1>
              <p className={styles.titleSub}>
                Fast, secure, and non-custodial trading.
              </p>
            </div>
          </div>
          <div className={styles.titleWrap}>
            <RubicWidget />
          </div>
          <div className={styles.content}>
            <p className={styles.subtext}>
              Built for traders. Powered by DeFi. Driven by Bigrock.
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
