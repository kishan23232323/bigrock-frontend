import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getLeaderboardApi,getUserRankApi } from "../../services/Swap/swapapi";


export default function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [userRank, setUserRank] = useState(null);

  // 🔹 Replace with actual wallet from your app
  const walletAddress = null;

  // 🎁 reward logic
  const getReward = (rank) => {
    if (rank === 1) return "$900";
    if (rank === 2) return "$700";
    if (rank === 3) return "$500";
    if (rank <= 10) return "$170";
    if (rank <= 30) return "$50";
    if (rank <= 50) return "$35";
    return "-";
  };

  // 📊 fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboardApi({ page, limit: 40 });
      setLeaderboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 👤 fetch user rank
  const fetchUserRank = async () => {
    if (!walletAddress) return;
    try {
      const data = await getUserRankApi(walletAddress);
      setUserRank(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔁 auto update
  useEffect(() => {
    fetchLeaderboard();
    fetchUserRank();

    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [page]);

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">

      {/* USER CARD */}
      {userRank && (
        <div className="
          mb-6 px-6 py-4 rounded-xl
          bg-white/5 border border-white/10
          flex justify-between text-sm
        ">
          <span>Your Rank: #{userRank.rank}</span>
          <span>
            Volume: ${Number(userRank.totalVolume).toLocaleString()}
          </span>
        </div>
      )}

      {/* TABLE */}
      {/* HEADER */}
<div className="
  grid grid-cols-4 px-4 md:px-6 py-4 
  text-gray-400 text-xs md:text-sm 
  border-b border-white/10
">
  <span>Rank</span>
  <span>Address</span>
  <span className="text-right">Volume</span>
  <span className="text-right">Reward</span>
</div>

{/* ROWS */}
{leaderboard.map((row) => {
  const isMe =
    walletAddress &&
    row.userAddress === walletAddress.toLowerCase();

  return (
    <motion.div
      key={row.rank}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      className={`
        grid grid-cols-4 px-4 md:px-6 py-4 
        border-b border-white/5 items-center
        ${isMe ? "bg-green-500/10" : ""}
      `}
    >
      {/* Rank */}
      <span className={`
        font-semibold text-sm md:text-base
        ${row.rank === 1 && "text-yellow-400"}
        ${row.rank === 2 && "text-gray-300"}
        ${row.rank === 3 && "text-orange-400"}
      `}>
        #{row.rank}
      </span>

      {/* Address (truncate FIX 🔥) */}
      <span className="
        text-gray-300 truncate min-w-0
        text-xs md:text-sm
      ">
        {row.userAddress}
      </span>

      {/* Volume (rounded + aligned) */}
      <span className="text-right text-xs md:text-sm">
        ${Number(row.totalVolume).toFixed(2)}
      </span>

      {/* Reward */}
      <span className="
        text-green-400 text-right text-xs md:text-sm
      ">
        {getReward(row.rank)}
      </span>
    </motion.div>
  );
})}

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-4">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="
            px-4 py-2 rounded-lg
            bg-white/10 disabled:opacity-40
            hover:bg-green-500/40 transition
          "
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {[1, 2, 3, 4].map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`
              w-10 h-10 rounded-lg
              ${page === p ? "bg-green-500/50" : "bg-white/10"}
              hover:bg-green-500/40 transition
            `}
          >
            {p}
          </button>
        ))}

        {/* NEXT */}
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="
            px-4 py-2 rounded-lg
            bg-white/10 hover:bg-green-500/40 transition
          "
        >
          Next
        </button>

      </div>

    </section>
  );
}