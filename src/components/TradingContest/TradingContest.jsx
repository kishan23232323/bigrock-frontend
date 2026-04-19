import React from "react";
import { motion } from "framer-motion";
import Leaderboard from "./Leaderboard";
import Rewards from "./Rewards";
import { Link } from "react-router-dom";



export default function TradingContest() {
      const SectionHeading = ({ text }) => {
        return (
          <div className="relative py-24 flex justify-center items-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 0.08, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute text-[100px] md:text-[160px] font-extrabold text-white/10 tracking-tight select-none"
            >
              {text}
            </motion.div>
    
            <motion.h2
              initial={{ opacity: 0, y: 50, scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10 text-5xl md:text-7xl font-extrabold text-white"
            >
              {text}
            </motion.h2>
          </div>
        );
      };
  return (
    <div className="bg-black text-white font-[Inter] w-full overflow-x-hidden">

      {/* HERO */}
      <section className="pt-40 pb-32 relative overflow-hidden">

  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 via-black to-black"></div>

  <div className="relative max-w-6xl mx-auto px-6 text-center">

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        text-5xl md:text-7xl font-extrabold mb-6
        text-yellow-200
        drop-shadow-[0_0_20px_rgba(255,200,100,0.4)]
      "
    >
      Trade Wars - $7,000 Trading Battle
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        text-lg md:text-xl text-yellow-100 italic
        opacity-80
      "
    >
      Trade more, climb higher, earn rewards.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-10"
    >
      <Link to={"/"} className="
        px-10 py-3 rounded-xl font-semibold
        bg-gradient-to-r from-yellow-500 to-orange-500
        shadow-[0_0_25px_rgba(255,180,80,0.5)]
        hover:scale-105 transition
      ">
        Start Trading
      </Link>
    </motion.div>

  </div>
</section>

      {/* REWARDS */}
      <SectionHeading text="Rewards" />
      <Rewards />

      {/* LEADERBOARD */}
      <SectionHeading text="Leaderboard" />
      <Leaderboard />

      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-4">

  <h2 className="text-4xl font-bold text-center mb-8">FAQ</h2>

  {[
    {
      q: "How do I participate in the Bigrock Omnichain Trading Competition? Do I need to register?",
      a: "During the event period, you can automatically participate by trading on Bigrock. No separate registration is required. The system tracks your volume automatically.",
    },
    {
      q: "How are leaderboard rewards distributed and when will they be delivered?",
      a: "Rewards are distributed within 7 days after event ends. Any suspicious activity like wash trading or self-trading may lead to disqualification.",
    },
    {
      q: "How often is the leaderboard updated?",
      a: "Leaderboard updates every 10 minutes during the event.",
    },
    {
      q: "Why does leaderboard only show wallet addresses?",
      a: "To ensure transparency and privacy, only wallet addresses are displayed.",
    },
  ].map((item, i) => (
    <details
      key={i}
      className="bg-white/5 border border-white/10 rounded-lg p-4"
    >
      <summary className="text-lg font-semibold cursor-pointer">
        {item.q}
      </summary>

      <p className="text-gray-300 mt-2 text-sm">
        {item.a}
      </p>
    </details>
  ))}

</section>

    </div>
  );
}