import React, { useEffect, useState } from "react";
import styles from "../AdminPanel/AdminOrders.module.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { approveKolApi, getAllKolsApi } from "../../services/Swap/swapapi";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const StatCard = ({ label, value, highlight }) => {
  return (
    <div
      className={`rounded-xl p-4 border min-w-0 ${
        highlight
          ? "bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border-cyan-500/30"
          : "bg-slate-900/60 border-slate-700"
      }`}
    >
      <p className="text-xs text-gray-400 mb-1">{label}</p>

      <p
        className={`text-sm sm:text-base font-semibold ${
          highlight ? "text-cyan-400" : "text-white"
        } break-all`}
      >
        {value}
      </p>
    </div>
  );
};

const KolRow = ({ kol, expanded, onToggle }) => (
  <div className={styles.orderRow} onClick={onToggle}>
    <div>
      <p className="text-white font-semibold">{kol.fullName}</p>
      <p className="text-gray-400 text-sm">{kol.email}</p>
    </div>

    <div className="flex items-center gap-3">
      <span className={`${styles.statusBadge} ${styles[kol.status.toLowerCase()]}`}>
        {kol.status}
      </span>

      {expanded ? <IoChevronUp /> : <IoChevronDown />}
    </div>
  </div>
);

const KolDetails = ({ kol, onApprove }) => {
     const referralLink = `${window.location.origin}/?ref=${kol.kolUid}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };
    
  return (
    <div className="mt-4 space-y-4">

      {/* 🔗 Referral Link */}
      <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="truncate text-sm text-cyan-400 font-medium">
          {referralLink}
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-lg text-sm transition"
        >
          <Copy size={16} />
          Copy
        </button>
      </div>

      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

        <StatCard label="KOL UID" value={kol.kolUid} highlight />

        <StatCard label="Referrals" value={kol.totalRefferrals} />

        <StatCard label="Transactions" value={kol.totalTransactions} />

        <StatCard
          label="Total Volume"
          value={`$${kol.totalVolume}`}
          highlight
        />

        <StatCard
          label="Commission Earned"
          value={`$${kol.totalCommissionEarned}`}
        />

        <StatCard
          label="Commission Paid"
          value={`$${kol.totalCommissionPaid}`}
        />

      </div>

      {/* 🔥 Approve Button */}
      {kol.status !== "APPROVED" && (
        <button
          onClick={() => onApprove(kol._id)}
          className="w-full mt-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Approve KOL
        </button>
      )}
    </div>
  );
};

const KolCard = ({ kol, onApprove }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.orderCard}>
      <KolRow kol={kol} expanded={expanded} onToggle={() => setExpanded(!expanded)} />

      {expanded && <KolDetails kol={kol} onApprove={onApprove} />}
    </div>
  );
};

const KolApplications = () => {
  const [kols, setKols] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const loadKols = async () => {
    const data = await getAllKolsApi({ page, search });

    setKols(data.kols);
    setTotalPages(data.pagination.totalPages);
  };

  useEffect(() => {
    const t = setTimeout(loadKols, 400);
    return () => clearTimeout(t);
  }, [page, search]);

  const approve = async (kolId) => {
    await approveKolApi(kolId);
    loadKols();
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.heading}>KOL Applications</h1>

      <input
        className="mb-4 w-full rounded-lg bg-white/5 border border-white/20 px-4 py-2 text-white"
        placeholder="Search KOL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {kols.map((kol) => (
        <KolCard key={kol._id} kol={kol} onApprove={approve} />
      ))}

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default KolApplications;