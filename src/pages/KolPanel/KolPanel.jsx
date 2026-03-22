import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
import { getMyKolDataApi } from "../../services/Swap/swapapi";

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

const shorten = (str) => {
  if (!str) return "";
  return str.slice(0, 6) + "..." + str.slice(-4);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export default function KolDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getMyKolDataApi();
      setData(res);
    } catch (err) {
      toast.error("Failed to load KOL data");
    }
  };

  if (!data) return <div className="text-white p-10">Loading...</div>;

  const referralLink = `${window.location.origin}/?ref=${data.kolUid}`;

  const copy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Copied!");
  };

  return (
    <div className="min-h-screen p-6 bg-[#08111B] text-white">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">KOL Dashboard</h1>

      {/* Referral Link */}
      <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row gap-3 justify-between mb-6">
        <span className="text-cyan-400 break-all">{referralLink}</span>

        <button
          onClick={copy}
          className="flex items-center gap-1 bg-cyan-500/20 px-3 py-1.5 rounded-lg"
        >
          <Copy size={16} />
          Copy
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

        <StatCard label="Referrals" value={data.totalRefferrals} />

        <StatCard label="Transactions" value={data.totalTransactions} />

        <StatCard label="Total Volume" value={`$${data.totalVolume}`} highlight />

        <StatCard label="Commission Earned" value={`$${data.totalCommissionEarned}`} />

        <StatCard label="Commission Paid" value={`$${data.totalCommissionPaid}`} />

        <StatCard
          label="Pending Commission"
          value={`$${data.pendingCommission}`}
          highlight
        />

      </div>

      <div className="mt-8">

  <h2 className="text-lg font-semibold mb-4">
    Recent Transactions
  </h2>

  <div className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden">

    {data.transactions?.length === 0 ? (
      <p className="text-gray-400 text-center py-6">
        No transactions yet
      </p>
    ) : (

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">

          <thead className="bg-slate-800 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Tx Hash</th>
              <th className="px-4 py-3">Wallet</th>
              <th className="px-4 py-3">Pair</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.transactions.map((tx) => (
              <tr key={tx.txHash} className="border-t border-slate-700">

                {/* TX HASH */}
                <a href={(tx.txHash)} target="_blank" rel="noopener noreferrer">
                <td className="px-4 py-3 text-cyan-400">
                  {shorten(tx.txHash)}
                </td>
                 </a>

                {/* WALLET */}
                <td className="px-4 py-3">
                  {shorten(tx.walletAddress)}
                </td>

                {/* TOKEN PAIR */}
                <td className="px-4 py-3">
                  {tx.fromToken} → {tx.toToken}
                </td>

                {/* AMOUNT */}
                <td className="px-4 py-3 text-green-400">
                  ${tx.amountUSD}
                </td>

                {/* DATE */}
                <td className="px-4 py-3 text-gray-400">
                  {formatDate(tx.createdAt)}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    )}
  </div>
</div>
    </div>
  );
}