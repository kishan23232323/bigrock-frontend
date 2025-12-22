import { User, CheckCircle, Clock, Circle, ShieldCheck } from "lucide-react";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getMyOrders } from "../services/P2Pservices/p2papi";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { accessToken, user } = useSelector((state) => state.auth || {});
  const[trades, setTrades]=useState([]);
  useEffect(()=>{
    if(!accessToken) return;
    getMyOrders()
    .then((res)=>{
      setTrades(res);
    })
    .catch((err)=>{
      console.log("Error fetching user trades:", err);
    });
  }, [accessToken])

  
  const stats = [
    {
      label: "Completed",
      value: trades.filter((t) => t.status === "COMPLETED").length,
      color: "cyan",
    },
    {
      label: "Pending",
      value: trades.filter(
        (t) => t.status === "PENDING" || t.status === "AWAITING_CONFIRMATION"
      ).length,
      color: "yellow",
    },
    {
      label: "Success Rate",
      value:
        trades.length > 0
          ? `${Math.round(
              (trades.filter((t) => t.status === "COMPLETED").length /
                trades.length) *
                100
            )}%`
          : "0%",
      color: "green",
    },
  ];

  const getTradeIcon = (status) => {
    if (status === "COMPLETED") return CheckCircle;
    if (status === "PENDING" || status === "AWAITING_CONFIRMATION") return Clock;
    return Circle;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={`${styles.pageWrapper} min-h-screen`}>
      <motion.div className={styles.contentWrapper} initial="hidden" animate="visible">

        {/* PROFILE CARD */}
        <motion.div className={styles.profileCard} variants={cardVariants}>
            
          <div className={`${styles.profileHeader} `}>
            <div className={`${styles.avatar} shrink-0`}>
              <User size={32} className={styles.avatarIcon} />
            </div>

           
              <div className={`${styles.profileInfo} flex-1 min-w-0`}>
              <div className={`${styles.userNameContainer} flex items-center gap-2`}>
                <h1 className={`${styles.userName} whitespace-nowrap`}>
                  {accessToken ? user?.name : "User"}
                </h1>
                {user?.isVerified && (
                  <ShieldCheck size={20} className={`${styles.verifiedBadge} shrink-0`} />
                )}
              
              </div>

              {accessToken && (
                <p className={styles.userUID}>UID: {user?.uid}</p>
              )}
            </div>
                  <Link to="/edit-profile" className={`${styles.primaryButton} `}>Edit</Link>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <p className={`${styles.statValue} ${styles[`stat${stat.color}`]}`}>
                  {stat.value}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TRADE HISTORY */}
        <motion.div className={styles.tradeCard} variants={cardVariants}>
          <h2 className={styles.cardTitle}>Trade History</h2>

          {trades.length === 0 ? (
            <p className="text-center text-gray-400">
              No P2P transactions yet
            </p>
          ) : (
            <div className={styles.tradeList}>
              {trades.map((trade) => {
                const Icon = getTradeIcon(trade.status);
                return (
                  <motion.div
                    key={trade._id}
                    className={styles.tradeItem}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={20} />
                    <div className={styles.tradeDetails}>
                      <div className={styles.tradeAmount}>
                        {trade.type} — {trade.usdtAmount} USDT
                      </div>
                      <div
                        className={`${styles.tradeStatus} ${
                          styles[`status${trade.status}`]
                        }`}
                      >
                        {trade.status}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* AGENT CARD */}
        <motion.div className={styles.agentCard} variants={cardVariants}>
          <h2 className={styles.cardTitle}>Become a P2P Agent</h2>
          <p className={styles.agentDescription}>
            Earn more by facilitating trades
          </p>
          <Link to="/agent">
            <motion.button className={styles.agentButton}>
              Register as Agent
            </motion.button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
