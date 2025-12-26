import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { LifiWidgetEventListener } from "../../components/Widget/LifiWidgetEventListener.jsx";
import LiFiWidgetComponent from "../../components/Widget/LifiWidget.jsx";

const cardInfo = [
  {
    imageSrc: "/heroCardImages/instantMultiChainSwaps.png",
    title: "Instant Multi-Chain Swaps",
    subtext:
      "Execute cross‑chain trades in seconds with smart routing.No waiting. Powered by LI.FI’s routing tech.",
  },
  {
    imageSrc: "/heroCardImages/Over80Blockchains.png",
    title: "60+ Blockchains Supported",
    subtext:
      "Trade assets across a huge range of networks from a single interface, covering 10,000+ tokens.",
  },
  {
    imageSrc: "/heroCardImages/earnAirdrops.png",
    title: "Earn BigRock tokens",
    subtext:
      "Swap rewards: earn BigRock tokens as a gas-fee reward for using the platform (Coming soon). " +
      "Referral rewards: invite friends, earn tokens directly when they join and trade.",
  },
  {
    imageSrc: "/heroCardImages/secure.png",
    title: "Secure & Non-Custodial",
    subtext:
      "Your keys, your crypto — trades execute directly from users’ wallets. Built for safety with a user‑first, non‑custodial flow.",
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
                Swap across <span className={styles.highlight}>60+</span> blockchains & <span className={styles.highlight}>10,000+</span> tokens
              </h1>
              <p className={styles.titleSub}>
                Fast, secure, and non-custodial trading.
              </p>
            </div>
          </div>
          {/* <div className={styles.titleWrap}>
            <RubicWidget />
          </div> */}
          <div className={styles.WidgetSection} style={{ marginBottom: "4rem", minHeight: "520px", position: "relative", zIndex: 10 }}>
            <div className={styles.WidgetWrap}>
              <LifiWidgetEventListener />
              <LiFiWidgetComponent />
            </div>
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
        <Link to="/presale" className={styles.mainImage}>
          <img src="/heroCardImages/poster1.png" alt="BigRock Exchange Logo" className={styles.logoImage} />
        </Link>

      </section>




    </div>
  );
};

export default Home;
