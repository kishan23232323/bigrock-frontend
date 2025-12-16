import React, { useState } from "react";
import styles from "./Footer.module.css";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaInstagram, FaDiscord, FaTelegram } from "react-icons/fa";
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
             className={styles.link}
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
             <div  className={styles.link}>
               <span className={styles.logoAccent }>BigRock</span>{" "}
              <span className={styles.logoSub}>Exchange</span>
             </div>
            </Link>
          </h2>
          <p className={styles.tagline}>
            Next-gen cross-chain swapping across 80+ blockchains. Fast, secure,
            non-custodial.
          </p>
          <div className={styles.socialRow}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaInstagram />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaDiscord />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
            >
              <FaTelegram />
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
                <Link to="/sonic-insentive">BigRock Incentive</Link>
              </li>
              <li className={styles.link}>
                <Link to="/airdrop">Earn</Link>
              </li>
            </ul>
          </div>
  </div>
        </div>
          <div  className={styles.newsletterSection}>
            <h3  className={styles.link} >Stay in the loop</h3>
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

      <div className={styles.footerBottom}>
        <p className={styles.powered}>© 2025 BigRock Exchange. All rights reserved.</p>
        <p className={styles.powered}>Powered by Web3 • Built for Multichain</p>
      </div>
    </footer>
  );
};

export default Footer;