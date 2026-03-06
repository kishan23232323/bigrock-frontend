import { motion } from "framer-motion";
import { useState } from "react";
import { registerTeam } from "../../services/Hackathon/teamApi";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const [teamSize, setTeamSize] = useState(2);

  // STATES
  const [teamName, setTeamName] = useState("");
  const [domain, setDomain] = useState("");

  const [leader, setLeader] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [members, setMembers] = useState([
    { name: "", mobile: "", email: "" },
    { name: "", mobile: "", email: "" },
    { name: "", mobile: "", email: "" },
  ]);

  // SUBMIT HANDLER
  const handleTeamSubmit = async (e) => {
    e.preventDefault();

    const filteredMembers = members.slice(0, teamSize - 1);

    const payload = {
      teamName,
      domain,
      teamSize,
      leader,
      members: filteredMembers,
    };

    try {
      await registerTeam(payload);
      toast.success("Team registered successfully!");
      // Reset form
      setTeamName("");
      setDomain("");
      setLeader({ name: "", mobile: "", email: "" });
      setMembers([
        { name: "", mobile: "", email: "" },
        { name: "", mobile: "", email: "" },
        { name: "", mobile: "", email: "" },
      ]);
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-5xl font-extrabold mb-12"
      >
        Team Registration
      </motion.h2>

      <motion.form
        onSubmit={handleTeamSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-xl border border-yellow-600/20
                   rounded-2xl p-8 shadow-[0_0_20px_rgba(255,200,0,0.15)] space-y-6"
      >
        {/* TEAM NAME */}
        <div>
          <label className="font-semibold text-yellow-300">Team Name *</label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30
                       focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
          />
        </div>

        {/* TEAM SIZE */}
        <div>
          <label className="font-semibold text-yellow-300">Team Size *</label>
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full mt-2 p-3 rounded-lg 
            bg-black/40 text-yellow-300
            border border-yellow-700/30
            focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40
            appearance-none"
          >
            <option className="text-black" value={2}>2 Members</option>
            <option className="text-black" value={3}>3 Members</option>
            <option className="text-black" value={4}>4 Members</option>
          </select>
        </div>

        {/* TEAM LEADER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-5 rounded-xl border border-yellow-700/20"
        >
          <h3 className="text-xl font-bold text-yellow-300 mb-4">Team Leader *</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm ">Leader Name *</label>
              <input
                type="text"
                required
                value={leader.name}
                onChange={(e) => setLeader({ ...leader, name: e.target.value })}
                className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Mobile Number *</label>
              <input
                type="tel"
                required
                value={leader.mobile}
                onChange={(e) => setLeader({ ...leader, mobile: e.target.value })}
                className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm">Email Address *</label>
              <input
                type="email"
                required
                value={leader.email}
                onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* MEMBER 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-5 rounded-xl border border-yellow-700/20"
        >
          <h3 className="text-xl font-bold text-yellow-300 mb-4">Team Member 2 *</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Name *</label>
              <input
                type="text"
                required
                value={members[0].name}
                onChange={(e) => {
                  const updated = [...members];
                  updated[0].name = e.target.value;
                  setMembers(updated);
                }}
                className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Mobile Number *</label>
              <input
                type="tel"
                required
                value={members[0].mobile}
                onChange={(e) => {
                  const updated = [...members];
                  updated[0].mobile = e.target.value;
                  setMembers(updated);
                }}
                className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm">Email Address *</label>
              <input
                type="email"
                required
                value={members[0].email}
                onChange={(e) => {
                  const updated = [...members];
                  updated[0].email = e.target.value;
                  setMembers(updated);
                }}
                className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* MEMBER 3 */}
        {teamSize >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-5 rounded-xl border border-yellow-700/20"
          >
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Team Member 3</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  value={members[1].name}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[1].name = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Mobile Number</label>
                <input
                  type="tel"
                  value={members[1].mobile}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[1].mobile = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm">Email Address</label>
                <input
                  type="email"
                  value={members[1].email}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[1].email = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* MEMBER 4 */}
        {teamSize === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-5 rounded-xl border border-yellow-700/20"
          >
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Team Member 4</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  value={members[2].name}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[2].name = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Mobile Number</label>
                <input
                  type="tel"
                  value={members[2].mobile}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[2].mobile = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm">Email Address</label>
                <input
                  type="email"
                  value={members[2].email}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[2].email = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* BIGROCK ACCOUNT REQUIREMENT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/40 
                        text-red-300 rounded-xl p-4 text-sm leading-relaxed"
        >
          ⚠️ <strong>Important:</strong>
          All team members must have an account on
          <span className="text-yellow-300 font-semibold"> bigrock.exchange </span>
          before completing team registration. Teams with members not registered will not able to submit their registration.
        </motion.div>

        {/* DOMAIN SELECTION */}
        <div>
          <label className="font-semibold text-yellow-300">Domain *</label>
          <select
            required
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="
             w-full mt-2 p-3 rounded-lg 
            bg-black/40 text-yellow-300
            border border-yellow-700/30
            focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40
            appearance-none
            "
          >
            <option className="bg-black text-black" value="">Select a Domain</option>
            <option className="bg-black text-black">Artificial Intelligence (AI)</option>
            <option className="bg-black text-black">Web Development</option>
            <option className="bg-black text-black">Sustainability & Green Tech</option>
            <option className="bg-black text-black">Web3 & Decentralization</option>
          </select>
        </div>


        {/* TELEGRAM */}
        <div>
          <label className="font-semibold text-yellow-300">
            Join our Telegram Channel *
          </label>
          <p className="text-yellow-200 text-sm mb-2">
            <a href="https://t.me/+PGohKmN3pG9kMzQ1" target="_blank">
              Click here to join
            </a>
          </p>
        </div>

        {/* COMMUNITY WARNING */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-yellow-500/10 border border-yellow-600/40 
                        text-yellow-300 rounded-xl p-4 text-sm leading-relaxed mt-4"
        >
          ⚠️ Make sure all participants join our Telegram for problem statements, updates, and support during the hackathon. 
         
        </motion.div>

        {/* SUBMIT BUTTON */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-8 py-3 rounded-lg bg-gradient-to-r 
                     from-yellow-400 to-amber-500 text-black font-bold
                     shadow-[0_0_20px_rgba(255,200,0,0.4)] text-slate-100"
        >
          Register Team
        </motion.button>
      </motion.form>
    </section>
  );
}

/* Tailwind helper class for inputs */
<style>
{`
  .input-field {
    @apply w-full mt-2 p-3 rounded-lg bg-white/5 border border-yellow-700/30 
           focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40 outline-none;
  }
`}
</style>