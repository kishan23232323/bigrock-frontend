import { Home, ArrowLeftRight, Star, User } from "lucide-react";

export default function ProfilePage({ onNavigate }) {
  const trades = [
    { id: 1, type: "BUY", amount: "31 BTC", status: "COMPLETED", icon: "✓", color: "text-cyan-400" },
    { id: 2, type: "BUY", amount: "0 BTC", status: "COMPLETED", icon: "✓", color: "text-cyan-400" },
    { id: 3, type: "SELL", amount: "0.5 ETH", status: "PENDING", icon: "!", color: "text-cyan-400" },
    { id: 4, type: "SELL", amount: "0.5 ETH", status: "", icon: "○", color: "text-gray-500" },
    { id: 5, type: "", amount: "2.0 Z Of 91x (100 Trades)", status: "", icon: "○", color: "text-gray-500" }
  ];

  // -------------------------
  // BOTTOM NAVIGATION (MOBILE)
  // -------------------------
  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 md:hidden z-50">
      <div className="flex justify-around items-center py-3 max-w-xl mx-auto">

        <button onClick={() => onNavigate("home")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-cyan-400">
          <Home size={22} />
        </button>

        <button onClick={() => onNavigate("home")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-cyan-400">
          <ArrowLeftRight size={22} />
        </button>

        <button onClick={() => onNavigate("airdrop")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-cyan-400">
          <Star size={22} />
        </button>

        <button onClick={() => onNavigate("profile")} className="flex flex-col items-center gap-1 text-cyan-400">
          <User size={22} />
        </button>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden pb-32 mt-10">

      {/* Animated Background Grid - Same as Home Page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(6, 238, 245, 0.06) 1px, transparent 1px),
              linear-gradient(0deg, rgba(6, 238, 245, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "gridMove 22s linear infinite",
          }}
        />
      </div>

      {/* Glowing Orbs - Cyan & Purple (Subtle) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Page Content */}
      <div className="relative z-10 max-w-md mx-auto p-6 pt-12">

        {/* ----------------------- */}
        {/* Modern Profile Card     */}
        {/* ----------------------- */}

        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-cyan-400/40 p-6 rounded-2xl mb-6 shadow-2xl">
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-400/20 flex items-center justify-center border border-cyan-400/60 shadow-lg">
              <User size={30} className="text-cyan-300" />
            </div>

            {/* User Details */}
            <div>
              <h2 className="text-xl font-bold text-white">Pavan Kumar</h2>
              <p className="text-gray-400 text-sm">UID: 927261</p>

              <span className="mt-1 inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 px-3 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                Level 3 Trader
              </span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-between mt-5 text-center">
            <div>
              <p className="text-lg font-bold text-cyan-300">43</p>
              <p className="text-gray-400 text-xs">Completed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-300">2</p>
              <p className="text-gray-400 text-xs">Pending</p>
            </div>
            <div>
              <p className="text-lg font-bold text-cyan-300">98%</p>
              <p className="text-gray-400 text-xs">Success Rate</p>
            </div>
          </div>
        </div>

        {/* ----------------------- */}
        {/* Trade History Section   */}
        {/* ----------------------- */}

        <div className="rounded-2xl p-5 bg-slate-900/60 backdrop-blur-xl border border-cyan-400/30 mb-6 shadow-2xl">
          <h3 className="text-lg font-semibold mb-4 text-white">Trade History</h3>

          <div className="space-y-3">
            {trades.map((trade) => (
              <div key={trade.id} className="flex items-center gap-3 text-xs">
                
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    trade.icon === "✓"
                      ? "bg-cyan-500/30 border border-cyan-400/50"
                      : trade.icon === "!"
                      ? "bg-yellow-500/20 border border-yellow-400/50"
                      : "bg-slate-700/50 border border-slate-600"
                  }`}
                >
                  <span className={trade.color}>{trade.icon}</span>
                </div>

                <div className="flex-1">
                  <div className="text-gray-200">
                    {trade.type && `${trade.type} `}
                    {trade.amount}
                  </div>

                  {trade.status && (
                    <div
                      className={`text-[10px] ${
                        trade.status === "COMPLETED"
                          ? "text-cyan-400"
                          : trade.status === "PENDING"
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      {trade.status}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ----------------------- */}
        {/* Become Agent Box        */}
        {/* ----------------------- */}

        <div className="rounded-2xl p-5 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/50 mb-20 backdrop-blur-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-white">Become a PP2 Agent</h3>
          <p className="text-xs text-gray-300 mb-4">Earn more by facilitating trades</p>

          <button
            onClick={() => onNavigate("register-agent")}
            style={{
            background: "linear-gradient(135deg, #06eef5, #00ffa3)",
            boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
          }}
            className="w-full py-2.5 rounded-lg text-slate-900 font-semibold text-sm transition duration-300 transform hover:scale-[1.02]"
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 30px rgba(6, 238, 245, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(6, 238, 245, 0.4)";
            }}
          >
            Register as Agent
          </button>
        </div>

      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <Navigation />

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </div>
  );
}
