import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

export default function Rewards() {

  const top3 = [
    { rank: "1st", reward: "$900 + $300 BRK Tokens", glow: "from-yellow-400/40 to-yellow-600/20" },
    { rank: "2nd", reward: "$700 + $200 BRK Tokens", glow: "from-gray-300/40 to-gray-600/20" },
    { rank: "3rd", reward: "$500 + $150 BRK Tokens", glow: "from-amber-600/40 to-amber-800/20" },
  ];

  const tiers = [
    { label: "Rank 4-10", reward: "$170 + $70 BRK Tokens" },
    { label: "Rank 11-30", reward: "$50 + $25 BRK Tokens" },
    { label: "Rank 31-50", reward: "$35 + $17 BRK Tokens" },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 text-center">

      {/* TOP 3 */}
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        {top3.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`
              p-8 rounded-2xl backdrop-blur-xl border border-white/10
              bg-gradient-to-br ${t.glow}
              shadow-[0_0_25px_rgba(255,200,0,0.25)]
            `}
          >
            <FaTrophy className="mx-auto text-yellow-300 mb-4" size={40}/>
            <h3 className="text-2xl font-bold">{t.rank}</h3>
            <p className="text-xl text-gray-200">{t.reward}</p>
          </motion.div>
        ))}
      </div>

      {/* TIERS */}
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((t, i) => (
          <div
            key={i}
            className="
              p-6 rounded-xl bg-white/5 border border-white/10
              backdrop-blur-md
            "
          >
            <h3 className="text-lg text-gray-300">{t.label}</h3>
            <p className="text-xl font-semibold">{t.reward}</p>
          </div>
        ))}
      </div>
    </section>
  );
}