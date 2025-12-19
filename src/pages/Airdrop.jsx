// Airdrop.jsx
import React, { useState, useEffect } from "react";
import { Home, ArrowLeftRight, Star, User, Copy, Check } from "lucide-react";
import styles from "./Airdrop.module.css";
import { toast } from 'react-toastify';
import { saveWalletAddress } from '../services/Airdrops/airdropsapi';

// ICON IMPORTS
import { FiCreditCard, FiRepeat, FiUserPlus } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import { getUserProfile } from "../services/authservices/authapi";
import { useAccount, useAccountEffect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWeb3 } from "../../context/Web3Context.jsx";
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
  { id: 2, name: "Early Bird Bonus", amount: "0 SONIC", status: "LOCKED", icon: "🔒" },
  { id: 3, name: "Referral Rewards", amount: "1250 SONIC", status: "PENDING", icon: "!" },
];

export default function AirdropPage({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [airdropData, setAirdropData] = useState(initialAirdropData);
  const [loading, setLoading] = useState(null);

  const token = localStorage.getItem("accessToken");
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const {
    withdrawReferReward,
    withdrawWalletReward,
  } = useWeb3();

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
          { id: 1, name: "BIGROCK Launch", amount: "500 BIGROCK", status: user.walletPointsClaimed ? "CLAIMED" : "CLAIMABLE", icon: "✓" },
          { id: 2, name: "Early Bird Bonus", amount: "0 BIGROCK", status: "LOCKED", icon: "🔒" },
          { id: 3, name: "Referral Rewards", amount: `${user.referralPoints || 0} BIGROCK`, status: user.referralPoints > 0 ? "CLAIMABLE" : (user.referredCount > 0 ? "CLAIMED" : "PENDING"), icon: "!" },
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
    try {
      setLoading(id);

      if (id === 1) {
        await withdrawWalletReward({ address, token });
      } else if (id === 3) {
        await withdrawReferReward({ address, token });
      }
      window.location.reload();

    } catch (err) {
      toast.error("Claim failed");
    } finally {
      setLoading(null); // 👈 stop loading
    }
  };


  const Navigation = () => (
    <div className={styles.bottomNav}>
      <div className={styles.navContainer}>
        <button onClick={() => onNavigate("home")} className={styles.navButton}>
          <Home size={22} />
        </button>
        <button onClick={() => onNavigate("p2p")} className={styles.navButton}>
          <ArrowLeftRight size={22} />
        </button>
        <button onClick={() => onNavigate("airdrop")} className={`${styles.navButton} ${styles.active}`}>
          <Star size={22} />
        </button>
        <button onClick={() => onNavigate("profile")} className={styles.navButton}>
          <User size={22} />
        </button>
      </div>
    </div>
  );

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
        {/* Header Card */}

        <div className={styles.headerCard}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Airdrop Hub</h1>

            <p className={styles.subtitle}>Claim your rewards and earn through referrals</p>
          </div>
          <div className={styles.totalRewards}>
            <p className={styles.rewardsLabel}>Total Claimable</p>
            <p className={styles.rewardsAmount}>{(user?.referralPoints || 0) + (!user?.walletPointsClaimed ? 500 : 0)} BIGROCK</p>
          </div>
          <Link to="/earninfo"  >
            <button className={styles.infoButton}>
              <GrCircleInformation size={20} />
            </button></Link>
        </div>


        {/* Airdrop Cards Grid */}
        {loading && <div className={styles.loadingRow}><p className={styles.loadingText}>Loading airdrops...</p></div>}
        <div className="flex flex-wrap justify-center gap-6 my-8">
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
                disabled={(isConnected && airdrop.status !== "CLAIMABLE") || loading === airdrop.id}
                onClick={() => {
                  if (!isConnected) {
                    openConnectModal && openConnectModal();
                  } else {
                    handleClaim(airdrop.id);
                  }
                }}
                className={`${styles.claimBtn} ${((isConnected && airdrop.status !== "CLAIMABLE") || loading === airdrop.id) ? styles.disabled : ""}`}
              >
                {!isConnected && openConnectModal
                  ? "Connect Wallet"
                  : loading === airdrop.id
                    ? "Claiming..."
                    : airdrop.status === "CLAIMABLE"
                      ? "Claim Now"
                      : airdrop.status}
              </button>
            </div>
          ))}
        </div>

        {/* Referral Section */}
        <div className={styles.referralCard} >
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

          <div className="mt-8 flex justify-center w-full">
            <div className="relative group w-full max-w-[280px]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative px-6 py-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-black/50 transition duration-300">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Referrals</span>
                <span className="text-4xl font-black text-white drop-shadow-md tracking-tight">
                  {user?.referredCount ? user.referredCount : 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Channels */}
        <div className={`${styles.referralCard} mt-6 mb-10`}>
          <h2 className={styles.sectionTitle}>Stay Connected</h2>
          <p className={styles.referralDesc}>Follow our social channels for the latest airdrop updates, announcements, and community events.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-[#229ED9]/30 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 transition-all duration-300"
            >
              <FaTelegramPlane size={24} className="text-[#229ED9] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Join Telegram</span>
            </a>

            <a href="https://x.com/" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <FaXTwitter size={24} className="text-white group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Follow X</span>
            </a>
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
