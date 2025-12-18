import { Home, ArrowLeftRight, Star, User, CheckCircle, Clock, Circle, ShieldCheck } from "lucide-react";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const trades = [
    { id: 1, type: "BUY", amount: "31 BTC", status: "COMPLETED", Icon: CheckCircle, color: "text-cyan-400" },
    { id: 2, type: "BUY", amount: "0 BTC", status: "COMPLETED", Icon: CheckCircle, color: "text-cyan-400" },
    { id: 3, type: "SELL", amount: "0.5 ETH", status: "PENDING", Icon: Clock, color: "text-yellow-400" },
    { id: 4, type: "SELL", amount: "0.5 ETH", status: "CANCELLED", Icon: Circle, color: "text-gray-500" },
    { id: 5, type: "SWAP", amount: "2.0 Z Of 91x (100 Trades)", status: "CANCELLED", Icon: Circle, color: "text-gray-500" }
  ];

  const stats = [
    { label: "Completed", value: "43", color: "cyan" },
    { label: "Pending", value: "2", color: "yellow" },
    { label: "Success Rate", value: "98%", color: "green" }
  ];

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
    <div className={`${styles.pageWrapper} min-h-screen`}>
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
              <div className={styles.userNameContainer}>
                <h1 className={styles.userName}>Pavan Kumar</h1>
                <ShieldCheck size={20} className={styles.verifiedBadge} />
              </div>
              <p className={styles.userUID}>UID: 927261</p>
              <div className={styles.levelBadge}>
                <span>Level 3 Trader</span>
              </div>
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
                  <trade.Icon size={20} className={`${styles.tradeIcon} ${trade.color}`} />
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

    </div>
  );
}
