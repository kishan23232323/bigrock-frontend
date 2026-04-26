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
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWeb3 } from "../../context/Web3Context.jsx";
import { formatUnits } from "viem";
// TASKS DATA
// const tasks = [
//   { id: 1, label: "Connect your wallet", icon: <FiCreditCard />, status: "Completed" },
//   { id: 2, label: "Perform a swap", icon: <FiRepeat />, status: "Completed" },
//   { id: 3, label: "Refer a friend", icon: <FiUserPlus />, status: "Invite" },
//   { id: 4, label: "Join our Telegram", icon: <FaTelegramPlane />, status: "Join" },
//   { id: 5, label: "Follow us on X", icon: <FaXTwitter />, status: "Follow" },
// ];
const initialAirdropData = [
  { id: 2, name: "Early Bird Bonus", amount: "0 BIGROCK", status: "CLAIMABLE", icon: "✓" },
  { id: 3, name: "Referral Rewards  ", amount: "0 BIGROCK", status: "LOCKED", icon: "!" },
];

export default function AirdropPage({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [airdropData, setAirdropData] = useState(initialAirdropData);
  const [loading, setLoading] = useState(null);

  const token = localStorage.getItem("accessToken");
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();


  const {
    withdrawReferReward,
    withdrawWalletReward,
  } = useWeb3();

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://www.bigrock.exchange/signup?referral=${user ? user.referralCode : ''}`);
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


  const referralLink = `https://www.bigrock.exchange/signup?referral=${user ? user.referralCode : ''}`;

  const EARLY_BIRD_POINTS = 10000;
  const MAX_POINTS = 25000;

 const earlyBirdPoints = EARLY_BIRD_POINTS;

const referredCount = Math.min(user?.referredCount || 0, 6);
const referralPoints = referredCount * 2500;


  const totalPoints = earlyBirdPoints + referralPoints;

  const progressPercent = Number(
    (totalPoints * 100) / MAX_POINTS
  );


  const handleClaim = async (id) => {
    try {
      setLoading(id);

      if (id === 2) {
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

  const [rewardState, setRewardState] = useState(null);
  const [rewardLoading, setRewardLoading] = useState(false);

  const { getUserRewardState } = useWeb3();
  useEffect(() => {
    if (!address) return;

    setRewardLoading(true);
    getUserRewardState(address)
      .then(setRewardState)
      .finally(() => setRewardLoading(false));
  }, [address]);


  useEffect(() => {
    if (!rewardState) return;

    setAirdropData([
      {
        id: 2,
        name: "Early Bird Bonus",
        amount: rewardState.walletClaimable ? "10000 BIGROCK" : "0 BIGROCK",
        status: rewardState.walletClaimable ? "CLAIMABLE" : "LOCKED",
        icon: rewardState.walletClaimable ? "✓" : "🔒",
      },
      {
        id: 3,
        name: "Referral Rewards",
        amount: `${formatUnits(rewardState.referPending, 18)} BIGROCK`,
        status: rewardState.referPending > 0n ? "CLAIMABLE" : "LOCKED",
        icon: rewardState.referPending > 0n ? "!" : "🔒",
      },
    ]);
  }, [rewardState]);

  useEffect(() => {
    if (!address) {
      setRewardState(null);
    }
  }, [address]);



  const isWalletConnected = !!address;

  const walletClaimable =
    isWalletConnected &&
    rewardState?.walletClaimable;
  const referClaimable =
    isWalletConnected &&
    rewardState?.referPending > 0n;

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
        {!isConnected && (
          <button
            onClick={openConnectModal}
            className={`${styles.connectBtn} mb-6`}
          >
            Connect Wallet
          </button>
        )}


        <div className={styles.headerCard}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Airdrop Hub</h1>

            <p className={styles.subtitle}>Claim your rewards and earn through referrals</p>
          </div>
          <div className={styles.totalRewards}>
            <p className={styles.rewardsLabel}>Total Claimable</p>

            <p className={styles.rewardsAmount}>
              {rewardLoading
                ? "Checking..."
                : rewardState
                  ? `${formatUnits(
                    (rewardState?.referPending ?? 0n) +
                    (rewardState?.walletClaimable ? 500n * 10n ** 18n : 0n),
                    18
                  )} BIGROCK`
                  : "0 BIGROCK"}
            </p>

          </div>
          <Link to="/earninfo">
            <button className="group flex items-center justify-center p-3 rounded-full bg-gray-900/50 backdrop-blur-md border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,238,245,0.25)] transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-[0_0_25px_rgba(6,238,245,0.6)] hover:scale-110">
              <GrCircleInformation size={24} className="group-hover:rotate-12 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Progress Section */}
      { progressPercent < 100 ? (
             <div className={styles.progressWrapper}>
          <div className={styles.progressRow}>
            <span>Your Progress</span>
            <span style={{ color: "#00e8ff", fontWeight: "600" }}>
              {progressPercent}%
            </span>
          </div>

          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className={styles.progressText}>
            {totalPoints} / {MAX_POINTS} BIGROCK
          </div>
        </div>
      ):
      (
         <div className="mt-6 w-full bg-black/30 border border-cyan-500/20 
                  rounded-xl p-4 backdrop-blur-md">

    <h2 className="text-cyan-400 font-semibold text-sm mb-2">
      Your Reward Claim Address
    </h2>

    <div className="w-full bg-[#0A0F1F] border border-cyan-500/30
                    text-cyan-300 px-4 py-3 rounded-lg
                    shadow-[0_0_10px_rgba(0,255,255,0.2)] 
                    break-all select-all">
      {user?.walletAddress || "No wallet connected"}
    </div>
  </div>
      )
      }


        {/* Airdrop Cards Grid */}
        {loading && <div className={styles.loadingRow}><p className={styles.loadingText}>Loading airdrops...</p></div>}
      { progressPercent === 100 &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 w-full">
          {airdropData.map((airdrop) => (
            <div key={airdrop.id} className={`${styles.airdropCard} flex flex-col`}>
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

              <h3 className={styles.airdropName}>
                {airdrop.name}
                {airdrop.id === 3 && (
                  <span className={styles.referralRate}>
                    ( 1 Referral = 2500 BIGROCK )
                  </span>
                )}
              </h3>

              <p className={styles.airdropAmount}>{airdrop.amount}</p>

              {/* 🔐 Eligibility messages */}
              {/* {airdrop.id === 2 && !isWalletConnected && (
                  <p className="text-xs text-center text-gray-400 mt-1">
                    Connect wallet to check eligibility
                  </p>
                )}

                {airdrop.id === 2 && isWalletConnected && rewardState && !rewardState.walletClaimable && (
                  <p className="text-xs text-gray-400 mt-1">
                    Waiting for admin approval
                  </p>
                )} */}


              <button
                disabled={
                  loading === airdrop.id ||
                  !isWalletConnected ||
                  (airdrop.id === 2 && !rewardState?.walletClaimable) ||
                  (airdrop.id === 3 && !referClaimable)
                }
                onClick={() => {
                  if (!isWalletConnected) {
                    openConnectModal();
                    return;
                  }

                  if (!token) {
                    disconnect();
                    toast.error("Please login first");
                    return;
                  }

                  handleClaim(airdrop.id);
                }}
                className={`${styles.claimBtn} ${loading === airdrop.id ||
                  !isWalletConnected ||
                  (airdrop.id === 2 && !rewardState?.walletClaimable) ||
                  (airdrop.id === 3 && !referClaimable)
                  ? styles.disabled
                  : ""
                  } mt-auto`}
              >
                {loading === airdrop.id
                  ? "Claiming..."
                  : !isWalletConnected
                    ? "Connect Wallet"
                    : airdrop.id === 2
                      ? rewardState?.walletClaimable
                        ? "Claim Now"
                        : "Locked"
                      : referClaimable
                        ? "Claim Now"
                        : "Locked"}
              </button>

            </div>
          ))}
        </div>

      }  


        {/* Referral Section */}

        <div className={styles.referralCard} >
          <h2 className={styles.sectionTitle}>Referral Program</h2>
          <p className={styles.referralDesc}>Earn BIGROCK for every friend you invite</p>
          {token ?
            <div>
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
                    <div className="mt-2 text-sm text-slate-400">
                      {user?.referredCount === 1 ? "friend" : "friends"} invited
                      </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-slate-400 font-medium">
                Share your referral link and earn 2500 BIGROCK for each successful signup (up to 6 referrals) 
                </div>
            </div>
            
            :
            <div className="mt-4 text-sm text-red-500 font-medium">
              Please login to get your referral link.
            </div>
          }
        </div>

        {/* Social Channels */}
        <div className={`${styles.referralCard} mt-6 mb-10`}>
          <h2 className={styles.sectionTitle}>Stay Connected</h2>
          <p className={styles.referralDesc}>Follow our social channels for the latest airdrop updates, announcements, and community events.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <a href="https://t.me/+PGohKmN3pG9kMzQ1" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-[#229ED9]/30 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 transition-all duration-300"
            >
              <FaTelegramPlane size={24} className="text-[#229ED9] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Join Telegram</span>
            </a>

            <a href="https://x.com/Bigrock_EXC" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <FaXTwitter size={24} className="text-white group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Follow X</span>
            </a>
          </div>
        </div>



      </div>


    </div >
  );
}
