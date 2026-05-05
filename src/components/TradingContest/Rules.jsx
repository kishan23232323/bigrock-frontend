import { motion } from "framer-motion";
import { FaTrophy, FaClock, FaDollarSign, FaShieldAlt } from "react-icons/fa";

export default function RulesSection() {

  const rules = [
    {
      icon: <FaClock className="text-yellow-400" />,
      title: "Contest Duration",
      desc: "The contest starts on April 23 and ends on May 20 at 00:00 (UTC).",
    },
    {
      icon: <FaDollarSign className="text-green-400" />,
      title: "Minimum Trade Requirement",
      desc: "Only trades with a value of $100 or more are counted towards the leaderboard.",
    },
    {
      icon: <FaTrophy className="text-orange-400" />,
      title: "Ranking Criteria",
      desc: "Users are ranked based on total eligible trading volume during the contest period.",
    },
   
    {
      icon: <FaShieldAlt className="text-blue-400" />,
      title: "Fair Play Policy",
      desc: "Wash trading, self-trading, or any suspicious activity will lead to disqualification.",
    },
    {
      icon: <FaClock className="text-purple-400" />,
      title: "Leaderboard Updates",
      desc: "Leaderboard is updated periodically (every 10 minutes).",
    },
  ];

  return (
    <section className="py-20 max-w-5xl mx-auto px-6">

      <div className="grid md:grid-cols-2 gap-6">

        {rules.map((rule, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
              flex gap-4 p-5 rounded-xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              hover:scale-[1.02] transition
            "
          >
            {/* Icon */}
            <div className="text-xl mt-1">
              {rule.icon}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {rule.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {rule.desc}
              </p>
            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}
