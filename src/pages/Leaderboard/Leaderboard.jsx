import {
    ChevronDown,
    LayoutDashboard,
    TrendingUp,
    BarChart3,
    History,
    HelpCircle,
    User,
    Trophy,
    Medal,
    Award,
    CheckCircle2,
    XCircle
} from "lucide-react";

export default function Leaderboard() {
    return (
        <div className="flex bg-[#06141D] text-white min-h-screen">

            {/* SIDEBAR */}
            <div className="w-[260px] bg-[#081B26] px-5 py-6 hidden md:flex flex-col border-r border-[#0f2a36]">
                <h1 className="text-[#3BE1D0] font-bold text-xl mb-8">
                    BIGROCK <br /> EXCHANGE
                </h1>

                <div className="bg-[#0E2A36] p-4 rounded-xl flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#163945] rounded-full flex items-center justify-center">
                        <User size={18} />
                    </div>
                    <div>
                        <p className="text-sm">Elite Trader</p>
                        <p className="text-xs text-[#3BE1D0]">Tier: Diamond</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-sm">

                    {/* Dashboard */}
                    <div className="group flex items-center gap-3 px-3 py-2 rounded-lg text-[#7F9BA8] cursor-pointer
  transition-all duration-300 hover:bg-[#0f2a36] hover:text-[#3BE1D0] hover:shadow-[0_0_12px_rgba(59,225,208,0.35)]">

                        <LayoutDashboard size={18} className="group-hover:text-[#3BE1D0]" />
                        Dashboard
                    </div>

                    {/* Trade */}
                    <div className="group flex items-center gap-3 px-3 py-2 rounded-lg text-[#7F9BA8] cursor-pointer
  transition-all duration-300 hover:bg-[#0f2a36] hover:text-[#3BE1D0] hover:shadow-[0_0_12px_rgba(59,225,208,0.35)]">

                        <TrendingUp size={18} className="group-hover:text-[#3BE1D0]" />
                        Trade
                    </div>

                    {/* Rankings */}
                    <div className="group flex items-center gap-3 px-3 py-2 rounded-lg text-[#7F9BA8] cursor-pointer
  transition-all duration-300 hover:bg-[#0f2a36] hover:text-[#3BE1D0] hover:shadow-[0_0_12px_rgba(59,225,208,0.35)]">

                        <BarChart3 size={18} className="group-hover:text-[#3BE1D0]" />
                        Rankings
                    </div>

                    {/* History */}
                    <div className="group flex items-center gap-3 px-3 py-2 rounded-lg text-[#7F9BA8] cursor-pointer
  transition-all duration-300 hover:bg-[#0f2a36] hover:text-[#3BE1D0] hover:shadow-[0_0_12px_rgba(59,225,208,0.35)]">

                        <History size={18} className="group-hover:text-[#3BE1D0]" />
                        History
                    </div>

                    {/* Support */}
                    <div className="group flex items-center gap-3 px-3 py-2 rounded-lg text-[#7F9BA8] cursor-pointer
  transition-all duration-300 hover:bg-[#0f2a36] hover:text-[#3BE1D0] hover:shadow-[0_0_12px_rgba(59,225,208,0.35)]">

                        <HelpCircle size={18} className="group-hover:text-[#3BE1D0]" />
                        Support
                    </div>

                </div>
            </div>

            {/* MAIN */}
            <div className="flex-1">

                {/* NAVBAR */}
                <div className="flex justify-between px-10 py-4 border-b border-[#0f2a36]">
                    <div className="flex gap-8 text-[#7F9BA8] text-sm">
                        <span>Markets</span>
                        <span className="text-[#3BE1D0] border-b-2 border-[#3BE1D0] pb-1">
                            Competition
                        </span>
                        <span>Leaderboard</span>
                        <span>Rules</span>
                        <span>FAQ</span>
                    </div>

                    <div className="flex gap-6 items-center">
                        <span className="text-[#7F9BA8]">Log In</span>
                        <button className="bg-[#3BE1D0] text-white px-5 py-2 rounded-lg font-semibold">
                            Connect Wallet
                        </button>
                    </div>
                </div>

                {/* HERO */}
                <div className="px-10 py-8">
                    <div className="relative rounded-2xl overflow-hidden bg-[#0B1E29] p-10">
                        <p className="text-[#3BE1D0] tracking-[3px] text-sm mb-3">
                            SEASON 04 ACTIVE
                        </p>

                        <h2 className="text-5xl font-bold mb-4 leading-tight">
                            PREMIUM TRADING <br /> DERIVATIVES
                        </h2>

                        <p className="text-[#8FA3B0] mb-6">
                            Join the world's most elite trading competition.
                        </p>

                        <button className="bg-[#3BE1D0] px-6 py-3 rounded-lg text-black font-semibold">
                            View Winners
                        </button>
                    </div>
                </div>

                {/* REWARDS */}
                <div className="px-10 mt-12">
                    <h3 className="text-[32px] font-semibold text-[#C7D2DA] mb-10">
                        Rewards Distribution
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* RUNNER */}
                        <div className="bg-[#0A1B26] border border-[#112B36] rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 mx-auto mb-4 bg-[#132733] rounded-xl flex items-center justify-center">
                                <Medal className="text-[#3BE1D0]" />
                            </div>
                            <p className="text-xs tracking-[2px] text-[#7F9BA8] mb-2">RUNNER UP</p>
                            <h2 className="text-[40px] font-semibold mb-6">800 USDT</h2>
                            <div className="h-[4px] bg-[#1C3642] rounded-full">
                                <div className="h-full w-[70%] bg-[#3BE1D0]" />
                            </div>
                        </div>

                        {/* CHAMPION */}
                        <div className="bg-[#0A1B26] border border-[#2B4F5C] rounded-2xl p-10 text-center relative">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3BE1D0]" />
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#132733] rounded-xl flex items-center justify-center">
                                <Trophy className="text-[#3BE1D0]" />
                            </div>
                            <p className="text-sm tracking-[2px] text-[#3BE1D0] mb-2">CHAMPION</p>
                            <h2 className="text-[64px] font-bold mb-4 leading-none">
                                1200 <br /> USDT
                            </h2>
                            <div className="px-4 py-2 bg-[#1C3642] text-xs rounded-full inline-block">
                                LEGENDARY TIER
                            </div>
                        </div>

                        {/* THIRD */}
                        <div className="bg-[#0A1B26] border border-[#112B36] rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 mx-auto mb-4 bg-[#132733] rounded-xl flex items-center justify-center">
                                <Award className="text-purple-400" />
                            </div>
                            <p className="text-xs tracking-[2px] text-[#7F9BA8] mb-2">THIRD PLACE</p>
                            <h2 className="text-[40px] font-semibold mb-6">500 USDT</h2>
                            <div className="h-[4px] bg-[#1C3642] rounded-full">
                                <div className="h-full w-[40%] bg-purple-400" />
                            </div>
                        </div>

                    </div>

                    {/* LOWER */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        {[
                            ["Rank 4-10", "200 USDT"],
                            ["Rank 11-20", "100 USDT"],
                            ["Rank 21-40", "50 USDT"],
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-[#0A1B26] border border-[#112B36] px-6 py-4 rounded-xl flex justify-between text-sm text-[#7F9BA8]"
                            >
                                <span>{item[0]}</span>
                                <span className="text-[#3BE1D0]">{item[1]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RULES + TABLE */}
                <div className="px-10 mt-12 grid lg:grid-cols-[360px_1fr] gap-8">

                    <div className="flex flex-col gap-6">

                        <div className="bg-[#0A1B26] border border-[#112B36] rounded-2xl p-6">
                            <h3 className="flex items-center gap-2 text-lg mb-6">
                                <Trophy size={18} className="text-[#3BE1D0]" />
                                Leaderboard Rules
                            </h3>

                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4 mb-4 text-sm text-[#8FA3B0]">
                                    <div className="w-9 h-9 bg-[#1A2F3A] rounded-lg flex items-center justify-center">{i}</div>
                                    <p>Rankings based on PnL across all perpetual pairs.</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#0A1B26] border border-[#112B36] rounded-2xl p-6 relative">
                            <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#2EE6C9]" />

                            <h3 className="text-xl mb-4 pl-3">Eligibility</h3>

                            <div className="pl-3 text-sm space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-[#2EE6C9]" size={16} />
                                    Minimum 500 USDT
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-[#2EE6C9]" size={16} />
                                    Level 2 KYC
                                </div>

                                <div className="flex items-center gap-2 text-[#6B7F8B]">
                                    <XCircle size={16} />
                                    Restricted
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="bg-[#0A1B26] border border-[#112B36] rounded-2xl overflow-hidden">

                        <div className="flex justify-between px-6 py-5">
                            <h3>Event Standings</h3>
                            <span className="bg-[#07171F] text-[#2EE6C9] text-xs px-3 py-1 rounded">
                                LIVE UPDATE
                            </span>
                        </div>

                        <div className="grid grid-cols-4 px-6 py-3 bg-[#132733] text-xs text-[#6B7F8B]">
                            <span>Rank</span>
                            <span>Address</span>
                            <span>Trading Amount</span>
                            <span>24h</span>
                        </div>

                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="grid grid-cols-4 px-6 py-5 border-t border-[#112B36]">
                                <span>{i}</span>
                                <span>0x71C...{i}</span>
                                <span>$4,290,102</span>
                                <span className="text-[#2EE6C9]">+12%</span>
                            </div>
                        ))}

                    </div>
                </div>

                {/* FAQ */}
                <div className="px-10 mt-20 pb-24">
                    <h2 className="text-[36px] mb-10">Frequently Asked Questions</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {["Rewards?", "Multiple accounts?", "Pairs?", "Volume?"].map((q, i) => (
                            <div key={i} className="bg-[#0A1B26] border border-[#112B36] rounded-xl px-6 py-5 flex justify-between items-center">
                                {q}
                                <ChevronDown size={18} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}