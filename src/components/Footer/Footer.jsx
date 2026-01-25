import React, { useState } from "react";
import styles from "./Footer.module.css";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaInstagram, FaDiscord, FaTelegram, FaMailchimp, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <h2 className={styles.logo}>
            <Link
             className={styles.logoLink}
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <img src="/heroCardImages/logo.png" alt="BigRock Exchange Logo" className={styles.logoImage} />
              
              <span className={styles.logoWord}>
                <span className={styles.logoTextPrimary}>BIG</span>
                <span className={styles.logoTextHighlight}>ROCK</span>
              </span>
              <span className={styles.logoTextSecondary}>EXCHANGE</span>

            </Link>
          </h2>
          <p className={styles.tagline}>
            Swap 60+ blockchains & 10,000+ tokens.Fast,secure,and non-custodial trading.
          </p>
          <div className={styles.socialRow}>
            <a
              href="https://x.com/bigrock_ex"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaXTwitter />
            </a>
            
            <a
              href="https://www.instagram.com/bigrock_exchange?igsh=MTZqeHhqOGp0YXRpMQ=="
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaInstagram />
            </a>
            <a
              href="https://t.me/+PGohKmN3pG9kMzQ1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaTelegram />
            </a>
            <a
              href="mailto:support@bigrock.exchange"
              className={styles.socialCircle}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className={styles.link}>
          <div className={styles.linkColumns}>
          <div className={styles.linksSection}>
            <h3>Helpful Links</h3>
            <ul className={styles.link}>
              <li className={styles.link} >
                <Link to="/about">About</Link>
              </li>
              <li className={styles.link}>
                <Link to="/career">Career</Link>
              </li>
              
              <li className={styles.link}>
                <Link to="/airdrop">Earn</Link>
              </li>
            </ul>
          </div>
          <div className={styles.newsletterSection}>
              <h3 className={styles.link}>Stay in the loop</h3>
              <p className={styles.newsletterText}>
                Get early access to new chains, features, and airdrop campaigns.
              </p>
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <MdEmail className={styles.emailIcon} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.subscribeButton}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.powered}>© 2025 BigRock Exchange. All rights reserved.</p>
        <p className={styles.powered}>Powered by Web3 • Built for Multichain</p>
      </div>
    </footer>
  );
};

export default Footer;