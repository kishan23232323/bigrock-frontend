import { Home, ArrowLeftRight, Star, User } from "lucide-react";
import styles from "./Profile.module.css";

export default function ProfilePage({ onNavigate }) {
  const trades = [
    { id: 1, type: "BUY", amount: "31 BTC", status: "COMPLETED", icon: "✓", color: "text-cyan-400" },
    { id: 2, type: "BUY", amount: "0 BTC", status: "COMPLETED", icon: "✓", color: "text-cyan-400" },
    { id: 3, type: "SELL", amount: "0.5 ETH", status: "PENDING", icon: "!", color: "text-cyan-400" },
    { id: 4, type: "SELL", amount: "0.5 ETH", status: "", icon: "○", color: "text-gray-500" },
    { id: 5, type: "", amount: "2.0 Z Of 91x (100 Trades)", status: "", icon: "○", color: "text-gray-500" }
  ];

  const stats = [
    { label: "Completed", value: "43", color: "cyan" },
    { label: "Pending", value: "2", color: "yellow" },
    { label: "Success Rate", value: "98%", color: "cyan" }
  ];

  const Navigation = () => (
    <div className={styles.bottomNav}>
      <div className={styles.navContainer}>
        <button onClick={() => onNavigate("home")} className={styles.navButton}>
          <Home size={22} />
        </button>
        <button onClick={() => onNavigate("p2p")} className={styles.navButton}>
          <ArrowLeftRight size={22} />
        </button>
        <button onClick={() => onNavigate("airdrop")} className={styles.navButton}>
          <Star size={22} />
        </button>
        <button onClick={() => onNavigate("profile")} className={`${styles.navButton} ${styles.active}`}>
          <User size={22} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.gridBackground}>
        <div className={styles.gridOverlay} />
      </div>

      <div className={styles.orbTopLeft} />
      <div className={styles.orbBottomRight} />
      <div className={styles.orbCenter} />

      <div className={styles.contentWrapper}>
        
        <div className={styles.profileCard}>
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
        </div>

        <div className={styles.tradeCard}>
          <h2 className={styles.cardTitle}>Trade History</h2>
          <div className={styles.tradeList}>
            {trades.map((trade) => (
              <div key={trade.id} className={styles.tradeItem}>
                <div className={`${styles.tradeIcon} ${styles[`icon${trade.icon === "✓" ? "Success" : trade.icon === "!" ? "Pending" : "Default"}`]}`}>
                  <span className={trade.color}>{trade.icon}</span>
                </div>
                <div className={styles.tradeDetails}>
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
            ))}
          </div>
        </div>

        <div className={styles.agentCard}>
          <h2 className={styles.cardTitle}>Become a P2P Agent</h2>
          <p className={styles.agentDescription}>Earn more by facilitating trades</p>
          <button 
            onClick={() => onNavigate("register-agent")}
            className={styles.agentButton}
          >
            Register as Agent
          </button>
        </div>

      </div>

      <Navigation />
    </div>
  );
}
