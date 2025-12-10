// Airdrop.jsx
import React from "react";
import styles from "./Airdrop.module.css";

// ICON IMPORTS
import { FiCreditCard, FiRepeat, FiUserPlus } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// TASKS DATA
const tasks = [
  { id: 1, label: "Connect your wallet", icon: <FiCreditCard />, status: "Completed" },
  { id: 2, label: "Perform a swap", icon: <FiRepeat />, status: "Completed" },
  { id: 3, label: "Refer a friend", icon: <FiUserPlus />, status: "Invite" },
  { id: 4, label: "Join our Telegram", icon: <FaTelegramPlane />, status: "Join" },
  { id: 5, label: "Follow us on X", icon: <FaXTwitter />, status: "Follow" },
];

const Airdrop = () => {
  const total = 100;
  const current = 50;
  const progress = (current / total) * 100;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerLogo}>@ SONIC</div>
        <h1 className={styles.mainTitle}>AIRDROP</h1>
        <p className={styles.subtitle}>
          COMPLETE THE TASKS BELOW
          <br />
          TO EARN 100 SONIC!
        </p>

        <div className={styles.sectionBox}>
          <div className={styles.sectionTitle}>AIRDROP PROGRESS</div>

          <div className={styles.progressBarOuter}>
            <div
              className={styles.progressBarInner}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.progressRow}>
            <span className={styles.progressAmount}>
              {current} / {total} SONIC
            </span>
            <span className={styles.progressPercent}>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.sectionTitle}>TASKS</div>

          <div className={styles.tasksList}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.taskRow}>
                <div className={styles.taskLeft}>
                  <div className={styles.taskIcon}>{task.icon}</div>
                  <span className={styles.taskLabel}>{task.label}</span>
                </div>

                <button
                  className={`${styles.taskStatus} ${
                    task.status === "Completed" ? styles.statusCompleted : ""
                  }`}
                >
                  {task.status}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footerBanner}>
          EARN 5 SONIC PER SWAP • LIMITED TO 5,000 USERS
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
