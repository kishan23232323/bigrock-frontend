// Airdrop.jsx
import React, { useState, useEffect } from "react";
import { Home, ArrowLeftRight, Star, User, Copy, Check } from "lucide-react";
import styles from "./Airdrop.module.css";
import { toast } from 'react-toastify';
import { getAirdrops, claimAirdrop, saveWalletAddress } from '../services/Airdrops/airdropsapi';

// ICON IMPORTS
import { FiCreditCard, FiRepeat, FiUserPlus } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import { getUserProfile } from "../services/authservices/authapi";
import { useAccount, useAccountEffect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// TASKS DATA
// const tasks = [
//   { id: 1, label: "Connect your wallet", icon: <FiCreditCard />, status: "Completed" },
//   { id: 2, label: "Perform a swap", icon: <FiRepeat />, status: "Completed" },
//   { id: 3, label: "Refer a friend", icon: <FiUserPlus />, status: "Invite" },
//   { id: 4, label: "Join our Telegram", icon: <FaTelegramPlane />, status: "Join" },
//   { id: 5, label: "Follow us on X", icon: <FaXTwitter />, status: "Follow" },
// ];
const initialAirdropData = [
  { id: 1, name: "Sonic Launch", amount: "500 SONIC", status: "CLAIMABLE", icon: "✓" },
  { id: 2, name: "Early Bird Bonus", amount: "250 SONIC", status: "CLAIMED", icon: "✓" },
  { id: 3, name: "Referral Rewards", amount: "1250 SONIC", status: "PENDING", icon: "!" },
  { id: 4, name: "Trading Volume", amount: "750 SONIC", status: "LOCKED", icon: "🔒" },
];

export default function AirdropPage({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [airdropData, setAirdropData] = useState(initialAirdropData);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");
  const { isConnected } = useAccount();

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/signup?referral=${user ? user.referralCode : ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(token);
        setUser(data);
        console.log("User:", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);


  useAccountEffect({
    onConnect({ address }) {
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


  const referralLink = `http://localhost:5173/signup?referral=${user ? user.referralCode : ''}`;


  // useEffect(() => {
  //   let mounted = true;
  //   setLoading(true);
  //   getAirdrops()
  //     .then((data) => {
  //       if (mounted && data && Array.isArray(data)) {
  //         setAirdropData(data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.warn('Failed to fetch airdrop data, using local version.', err);
  //     })
  //     .finally(() => setLoading(false));
  //   return () => { mounted = false; };
  // }, []);
  useEffect(() => {
    let mounted = true;

    try {
      if (!user) return;

      if (mounted) {
        setAirdropData([
          { id: 1, name: "Sonic Launch", amount: "500 SONIC", status: user.walletPointsClaimed ? "CLAIMED" : "CLAIMABLE", icon: "✓" },
          { id: 2, name: "Early Bird Bonus", amount: "250 SONIC", status: "CLAIMED", icon: "✓" },
          { id: 3, name: "Referral Rewards", amount: `${user.points || 0} SONIC`, status: user.points > 0 ? "CLAIMABLE" : "LOCKED", icon: "!" },
          { id: 4, name: "Trading Volume", amount: "750 SONIC", status: "LOCKED", icon: "🔒" },
        ]);
      }
    } catch (err) {
      console.warn("Failed to create airdrop data from user profile.", err);
    }

    return () => {
      mounted = false;
    };
  }, [user]);


  const handleClaim = async (id) => {
    // optimistic UI update
    const original = airdropData;
    setAirdropData(
      airdropData.map((airdrop) => (airdrop.id === id && airdrop.status === 'CLAIMABLE' ? { ...airdrop, status: 'CLAIMED' } : airdrop))
    );

    try {
      const res = await claimAirdrop(id);
      toast.success(res?.message || 'Airdrop claimed successfully');
    } catch (err) {
      // revert
      setAirdropData(original);
      toast.error(err?.message || 'Failed to claim airdrop');
    }
  };

  const total = 100;
  const current = 50;
  const progress = (current / total) * 100;

  return (
    <div className={styles.pageWrapper}>

      {/* Background */}
      <div className={styles.gridBackground}>
        <div className={styles.gridOverlay} />
      </div>

      {/* Orbs */}
      <div className={styles.orbTopLeft} />
      <div className={styles.orbBottomRight} />
      <div className={styles.orbCenter} />

      {/* Content */}
      <div className={styles.contentWrapper}>
        <ConnectButton.Custom>
          {({
            openConnectModal,
            openAccountModal,
            account,
            mounted,
          }) => {
            const connected = mounted && account;

            return (
              <button
                onClick={connected ? openAccountModal : openConnectModal}
                className={styles.connectBtn}
              >
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            );
          }}
        </ConnectButton.Custom>

        {/* Header Card */}

        <div className={styles.headerCard}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Airdrop Hub</h1>

            <p className={styles.subtitle}>Claim your rewards and earn through referrals</p>
          </div>
          <div className={styles.totalRewards}>
            <p className={styles.rewardsLabel}>Total Claimable</p>
            <p className={styles.rewardsAmount}>2,750 BIGROCK</p>
          </div>
          <Link to="/earninfo" >
            <button className={styles.infoButton}>
              <GrCircleInformation size={20} />
            </button></Link>
        </div>


        {/* Airdrop Cards Grid */}
        {loading && <div className={styles.loadingRow}><p className={styles.loadingText}>Loading airdrops...</p></div>}
        <div className={styles.cardsGrid}>
          {airdropData.map((airdrop) => (
            <div key={airdrop.id} className={styles.airdropCard}>
              <div className={styles.cardHeader}>
                <div
                  className={`${styles.statusIcon} ${styles[`status${airdrop.status.replace(" ", "")}`]
                    }`}
                >
                  {airdrop.icon}
                </div>
                <span
                  className={`${styles.statusBadge} ${styles[`badge${airdrop.status.replace(" ", "")}`]
                    }`}
                >
                  {airdrop.status}
                </span>
              </div>

              <h3 className={styles.airdropName}>{airdrop.name}</h3>
              <p className={styles.airdropAmount}>{airdrop.amount}</p>

              <button
                disabled={!isConnected || airdrop.status !== "CLAIMABLE"}
                onClick={() => handleClaim(airdrop.id)}
                className={`${styles.claimBtn} ${!isConnected || airdrop.status !== "CLAIMABLE"
                  ? styles.disabled
                  : ""
                  }`}
              >
                {!isConnected
                  ? "Connect Wallet"
                  : airdrop.status === "CLAIMABLE"
                    ? "Claim Now"
                    : airdrop.status}
              </button>
            </div>
          ))}
        </div>

        {/* Referral Section */}
        <div div className={styles.referralCard} >
          <h2 className={styles.sectionTitle}>Referral Program</h2>
          <p className={styles.referralDesc}>Earn BIGROCK for every friend you invite</p>

          <div className={styles.referralLinkBox}>
            <input
              type="text"
              value={referralLink}
              readOnly
              className={styles.referralInput}
            />
            <button onClick={handleCopy} className={styles.copyBtn}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          <div className={styles.referralStats}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Referrals</p>
              <p className={styles.statValue}>{user?.points ? user.points / 10 : 0}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Earnings</p>
              <p className={styles.statValue}>1,250 BIGROCK</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Commission</p>
              <p className={styles.statValue}>10%</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className={styles.infoCardsGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>How it Works</h3>
            <ul className={styles.infoList}>
              <li>Complete tasks to unlock airdrops</li>
              <li>Claim rewards directly to wallet</li>
              <li>Refer friends for bonus rewards</li>
              <li>No limits on earning potential</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Requirements</h3>
            <ul className={styles.infoList}>
              <li>Complete KYC verification</li>
              <li>Minimum wallet balance: 100 BIGROCK</li>
              <li>Active trading account</li>
              <li>7+ days account age</li>
            </ul>
          </div>
        </div>

      </div>


    </div>
  );
}
