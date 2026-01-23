import { User, CheckCircle, Clock, Circle, ShieldCheck } from "lucide-react";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getMyOrders, requestCancelOrder } from "../services/P2Pservices/p2papi";
import { useEffect, useState } from "react";
import {  IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";


const TradeItem = ({ trade, getTradeIcon, setTrades }) => {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const Icon = getTradeIcon(trade.status);

  const handleCancelRequest = async () => {
    try {
      setLoading(true);
      await requestCancelOrder(trade._id);
      setTrades((prev) =>
        prev.map((t) =>
          t._id === trade._id ? { ...t, cancelRequest: true } : t
        )
      );
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (showConfirm) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showConfirm]);


  return (
    <motion.div>
      {/* MAIN ROW (UNCHANGED) */}
      <motion.div
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

        <button
          onClick={() => setExpanded((p) => !p)}
          className="text-slate-400 hover:text-white transition"
        >
          {expanded ? <IoChevronUpOutline size={20} /> : <IoChevronDownOutline size={20} />}
        </button>
      </motion.div>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur p-4 text-sm"
        >
          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div><span className="text-slate-400">Order ID:</span> {trade._id}</div>
            <div><span className="text-slate-400">Country:</span> {trade.country}</div>
            <div><span className="text-slate-400">Network:</span> {trade.network}</div>
            <div><span className="text-slate-400">Payment:</span> {trade.paymentMethod}</div>
            <div><span className="text-slate-400">Fiat:</span> {trade.fiatAmount}</div>
            <div>
              <span className="text-slate-400">Created:</span>{" "}
              {new Date(trade.createdAt).toLocaleString()}
            </div>
          </div>

          {/* ACTION AREA */}
          <div className="mt-4 flex items-center justify-between">
            {trade.cancelRequest && (
              <span className="text-amber-400 font-medium">
                Cancel request already sent
              </span>
            )}

            {trade.status === "AWAITING_CONFIRMATION" && !trade.cancelRequest && (
              <button
                onClick={() => setShowConfirm(true)}
                className="ml-auto rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-red-400 hover:bg-red-500/20 transition font-semibold"
              >
                Request Cancel
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* CONFIRM MODAL */}
{showConfirm &&
  createPortal(
    <div className="globalModalOverlay">
      <div className="globalModalBox">
        <h3 className={styles.modalTitle}>Confirm Cancel Request</h3>
        <p className={styles.modalText}>
          Are you sure you want to send a cancel request for this trade?
          This action cannot be undone.
        </p>

        <div className={styles.modalActions}>
          <button
            onClick={() => setShowConfirm(false)}
            className={styles.modalBtnNo}
          >
            No
          </button>

          <button
            disabled={loading}
            onClick={handleCancelRequest}
            className={styles.modalBtnYes}
          >
            {loading ? "Sending..." : "Yes, Cancel"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}




    </motion.div>
  );
};



export default function ProfilePage() {
  const { accessToken, user } = useSelector((state) => state.auth || {});
  const[trades, setTrades]=useState([]);

  const isAgent = user?.role === "agent";
  const hasApplied = user?.agentStatus=== "PENDING" 
  const isSuspended = user?.agentStatus=== "SUSPENDED";
  const isRejected = user?.agentStatus=== "REJECTED";
  const navigate = useNavigate();




  useEffect(()=>{
    if(!accessToken) return;
    console.log("Fetching user trades...",user);
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
              {accessToken && (
                  <Link to="/edit-profile" className={`${styles.primaryButton} `}>Edit</Link>
              )}
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
            {trades.map((trade) => (
              <TradeItem
                key={trade._id}
                trade={trade}
                getTradeIcon={getTradeIcon}
                setTrades={setTrades}
              />
            ))}

            </div>
          )}
        </motion.div>

        {/* AGENT CARD */}
        <motion.div className={styles.agentCard} variants={cardVariants}>
          <h2 className={styles.cardTitle}>Become a P2P Agent</h2>
          <p className={styles.agentDescription}>
            Earn more by facilitating trades
          </p>
          <motion.button
            disabled={isAgent || hasApplied || isSuspended || isRejected}
            onClick={() => 
              navigate('/agent')
            }
            className={`${styles.agentButton} ${
              isAgent || hasApplied || isSuspended || isRejected
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
                
          >
            {isAgent
              ? "You are already an Agent"
              : hasApplied
              ? "Application Pending"
              : isSuspended
              ? "Application Suspended"
              : isRejected
              ? "Application Rejected"
              : "Register as Agent"
              
              }
          </motion.button>

        </motion.div>

      </motion.div>
    </div>
  );
}
