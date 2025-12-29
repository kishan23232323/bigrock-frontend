import { useNavigate } from "react-router-dom";
import {
  IoSwapHorizontalOutline,
  IoPersonAddOutline,
  IoPeopleOutline,
  IoStatsChartOutline,
} from "react-icons/io5";

const adminCards = [
  {
    title: "P2P Orders",
    description: "View and manage all P2P buy & sell orders",
    icon: IoSwapHorizontalOutline,
    route: "/admin/orders",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Agent Applications",
    description: "Review, approve or reject P2P agent requests",
    icon: IoPersonAddOutline,
    route: "/admin/agents-applications",
    accent: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Users",
    description: "Manage platform users (coming soon)",
    icon: IoPeopleOutline,
    disabled: true,
  },
  {
    title: "Reports",
    description: "System reports & analytics (coming soon)",
    icon: IoStatsChartOutline,
    disabled: true,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08111b] px-6 py-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Manage platform operations and reviews
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {adminCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              onClick={() => !card.disabled && navigate(card.route)}
              className={`
                relative rounded-2xl border border-white/10 
                bg-white/5 backdrop-blur-xl p-6
                transition cursor-pointer
                hover:scale-[1.02] hover:border-white/20
                ${card.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {/* Accent */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.accent}`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <Icon size={28} className="text-white" />
                  {card.disabled && (
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-slate-400">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
