import { Home, ArrowLeftRight, Star, User } from "lucide-react";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

// It's good practice to define components that don't depend on the parent's state or props outside the parent component.
// This prevents them from being recreated on every render, which is better for performance.
const Navigation = React.memo(({ onNavigate, activeTab }) => (
  <div className={styles.bottomNav}>
    <div className={styles.navContainer}>
      <button onClick={() => onNavigate("home")} className={`${styles.navButton} ${activeTab === 'home' ? styles.active : ''}`}>
        <Home size={22} />
      </button>
      <button onClick={() => onNavigate("p2p")} className={`${styles.navButton} ${activeTab === 'p2p' ? styles.active : ''}`}>
        <ArrowLeftRight size={22} />
      </button>
      <button onClick={() => onNavigate("airdrop")} className={`${styles.navButton} ${activeTab === 'airdrop' ? styles.active : ''}`}>
        <Star size={22} />
      </button>
      <button onClick={() => onNavigate("profile")} className={`${styles.navButton} ${activeTab === 'profile' ? styles.active : ''}`}>
        <User size={22} />
      </button>
    </div>
  </div>
));

// Mock data is moved outside the component. In a real app, this would likely come from props, context, or an API call.
const tradesData = [
  { id: 1, type: "BUY", amount: "31 BTC", status: "COMPLETED", icon: "✓", color: "text-cyan-400" },
  { id: 2, type: "BUY", amount: "0 BTC", status: "COMPLETED", icon: "✓", color: "text-cyan-400" },
  { id: 3, type: "SELL", amount: "0.5 ETH", status: "PENDING", icon: "!", color: "text-cyan-400" },
  { id: 4, type: "SELL", amount: "0.5 ETH", status: "", icon: "○", color: "text-gray-500" },
  { id: 5, type: "", amount: "2.0 Z Of 91x (100 Trades)", status: "", icon: "○", color: "text-gray-500" }
];

const statsData = [
  { label: "Completed", value: "43", color: "cyan" },
  { label: "Pending", value: "2", color: "yellow" },
  { label: "Success Rate", value: "98%", color: "cyan" }
];

export default function ProfilePage({ onNavigate }) {
  // Using the mock data.
  const trades = tradesData;
  const stats = statsData;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.gridBackground}>
        <div className={styles.gridOverlay} />
      </div>

      <div className={styles.orbTopLeft} />
      <div className={styles.orbBottomRight} />
      <div className={styles.orbCenter} />

      <motion.div
        className={styles.contentWrapper}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        
        <motion.div className={styles.profileCard} variants={cardVariants} whileHover={{ scale: 1.02 }}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              <User size={32} className={styles.avatarIcon} />
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.userName}>Pavan Kumar</h1>
              <p className={styles.userUID}>UID: 927261</p>
              <span className={styles.badge}>Level 3 Trader</span>
            </div>
          </div>

          <motion.div
            className={styles.statsGrid}
            variants={listContainerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                variants={cardVariants}
              >
                <p className={`${styles.statValue} ${styles[`stat${stat.color}`]}`}>
                  {stat.value}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className={styles.tradeCard} variants={cardVariants} whileHover={{ scale: 1.02 }}>
          <h2 className={styles.cardTitle}>Trade History</h2>
          <motion.div
            className={styles.tradeList}
            variants={listContainerVariants}
          >
            {trades.map((trade) => (
              <motion.div
                key={trade.id}
                className={styles.tradeItem}
                variants={cardVariants}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <div className={styles.tradeDetails}>
                  <div className={`${styles.tradeIcon} ${styles[`icon${trade.icon === "✓" ? "Success" : trade.icon === "!" ? "Pending" : "Default"}`]}`}>
                    <span className={trade.color}>{trade.icon}</span>
                  </div>
                  <div className={styles.tradeInfo}>
                    <div className={styles.tradeAmount}>
                      {trade.type && `${trade.type} `}
                      {trade.amount}
                    </div>
                    {trade.status && (
                      <div className={`${styles.tradeStatus} ${styles[`status${trade.status.replace(" ", "")}`]}`}>
                        {trade.status}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className={styles.agentCard} variants={cardVariants} whileHover={{ scale: 1.02 }}>
          <h2 className={styles.cardTitle}>Become a P2P Agent</h2>
          <p className={styles.agentDescription}>Earn more by facilitating trades</p>
          <Link to="/agent" >
            <motion.button type="button" className={styles.agentButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Register as Agent
            </motion.button>
          </Link>
        </motion.div>

      </motion.div>

      <Navigation onNavigate={onNavigate} activeTab="profile" />
    </div>
  );
}
