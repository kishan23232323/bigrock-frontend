import React, { useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { LifiWidgetEventListener } from "../../components/Widget/LifiWidgetEventListener.jsx";
import LiFiWidgetComponent from "../../components/Widget/LifiWidget.jsx";
import { useAccount, useAccountEffect } from "wagmi";
import { saveWalletAddress } from "../../services/Airdrops/airdropsapi.js";
import { toast } from "react-toastify";
import Presale from "../Presale";

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
      "User rewards are allocated to incentivize platform usage. Rewards are distributed periodically based on swap activity, with a controlled emission of 25 Million Bigrock tokens  every 6 months.",
  },
  {
    imageSrc: "/heroCardImages/secure.png",
    title: "Secure & Non-Custodial",
    subtext:
      "Your keys, your crypto — trades execute directly from users’ wallets. Built for safety with a user‑first, non‑custodial flow.",
  },
];

const Home = () => {

  const { address } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [AuditIsHovered, setAuditIsHovered] = useState(false);
  const [AuditisActive, setAuditIsActive] = useState(false);
  const [AudithasClicked, setAuditHasClicked] = useState(false);

  useAccountEffect({
    onConnect({ address }) {
      if (!token) return;
      if (!address) return;
      console.log("Connected address:", address);
      saveWalletAddress({ walletAddress: address, token })
        .then(() => {
          toast.success("Wallet connected");
        })
        .catch((err) => {
          toast.error(err?.message || "Failed to save wallet");
        });
    },
  });


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
              Built for traders. Powered by LI.FI. Driven by BIGROCK.
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
        {/* <Link to="/presale" className={styles.mainImage}>
          <img src="/heroCardImages/poster1.png" alt="BigRock Exchange Logo" className={styles.logoImage} />
        </Link> */}
        <Presale/>

                   <div className={styles.contractContainer}>
          <p className={styles.contractLabel}> BIGROCK TOKEN SMART CONTRACT ADDRESS</p>

          <div className={styles.contractSmallBox}>
            <span className={styles.contractSmallAddress}>
              {import.meta.env.VITE_REWARD_CONTRACT_ADDRESS}
            </span>

            <button
              className={styles.contractCopyBtn}
              onClick={() => {
                navigator.clipboard.writeText("0x1234...ABCD5678EF90123456789");
                toast.success("Copied!");
              }}
            >
              Copy
            </button>
          </div>
           <div className={styles.buttons}>
           <a href='/BIGROCK_Token_Audit_Report.pdf' download="BIGROCK($BRK) Token Audit Report.pdf"
            className={styles.primaryButton}
            style={{
              background: AudithasClicked ? "#4CAF50" : (AuditIsHovered ? "linear-gradient(135deg, #06eef5, #00ffa3)" : "transparent"),
              border: "1px solid #06eef5",
              color: "#ffffff",
              transition: "all 0.3s ease",
              transform: AuditisActive ? "scale(0.95)" : (AuditIsHovered ? "scale(1.05)" : "scale(1)"),
            }}
            onMouseEnter={() => setAuditIsHovered(true)}
            onMouseLeave={() => { setAuditIsHovered(false); setAuditIsActive(false); }}
            onMouseDown={() => setAuditIsActive(true)}
            onMouseUp={() => setAuditIsActive(false)}
            onClick={() => setAuditHasClicked(true)}
          >Audit Report
          </a>

        </div>

                <div className={styles.buttons}>
           <a href='/Bigrock_Exchange_Whitepaper_v1.0.pdf' download="BIGROCK Exchange Whitepaper v1.0.pdf"
            className={styles.primaryButton}
            style={{
              background: hasClicked ? "#4CAF50" : (isHovered ? "linear-gradient(135deg, #06eef5, #00ffa3)" : "transparent"),
              border: "1px solid #06eef5",
              color: "#ffffff",
              transition: "all 0.3s ease",
              transform: isActive ? "scale(0.95)" : (isHovered ? "scale(1.05)" : "scale(1)"),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onClick={() => setHasClicked(true)}
          >Whitepaper
          </a>

        </div>
        </div>





      </section>




    </div>
  );
};

export default Home;
