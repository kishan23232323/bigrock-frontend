export default function Leaderboard() {
    return (
        <div className="flex flex-col md:flex-row bg-[#06141D] text-white min-h-screen">

            {/* SIDEBAR (DESKTOP) */}
            <div className="w-[260px] bg-[#081B26] px-5 py-6 hidden md:flex flex-col border-r border-[#0f2a36]">
                {/* same sidebar code */}
            </div>

            {/* MOBILE TOP BAR */}
            <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-[#0f2a36] bg-[#081B26]">
                <h1 className="text-[#3BE1D0] font-bold text-sm">
                    BIGROCK EXCHANGE
                </h1>
                <User size={20} />
            </div>

            {/* MAIN */}
            <div className="flex-1">

                {/* NAVBAR */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4 px-4 md:px-10 py-4 border-b border-[#0f2a36]">
                    <div className="flex gap-4 md:gap-8 text-[#7F9BA8] text-xs md:text-sm overflow-x-auto">
                        <span>Markets</span>
                        <span className="text-[#3BE1D0] border-b-2 border-[#3BE1D0] pb-1">
                            Competition
                        </span>
                        <span>Leaderboard</span>
                        <span>Rules</span>
                        <span>FAQ</span>
                    </div>

                    <div className="flex gap-4 items-center text-xs md:text-sm">
                        <span className="text-[#7F9BA8]">Log In</span>
                        <button className="bg-[#3BE1D0] text-black px-3 md:px-5 py-2 rounded-lg font-semibold">
                            Connect
                        </button>
                    </div>
                </div>

                {/* HERO */}
                <div className="px-4 md:px-10 py-6 md:py-8">
                    <div className="rounded-2xl overflow-hidden bg-[#0B1E29] p-6 md:p-10">
                        <p className="text-[#3BE1D0] tracking-[2px] text-xs md:text-sm mb-3">
                            SEASON 04 ACTIVE
                        </p>

                        <h2 className="text-2xl md:text-5xl font-bold mb-4 leading-tight">
                            PREMIUM TRADING <br /> DERIVATIVES
                        </h2>

                        <p className="text-[#8FA3B0] text-sm md:text-base mb-6">
                            Join the world's most elite trading competition.
                        </p>

                        <button className="bg-[#3BE1D0] px-4 md:px-6 py-2 md:py-3 rounded-lg text-black font-semibold text-sm md:text-base">
                            View Winners
                        </button>
                    </div>
                </div>

                {/* REWARDS */}
                <div className="px-4 md:px-10 mt-8 md:mt-12">
                    <h3 className="text-xl md:text-[32px] font-semibold text-[#C7D2DA] mb-6 md:mb-10">
                        Rewards Distribution
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* cards same */}
                    </div>

                    {/* LOWER */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                        {/* same */}
                    </div>
                </div>

                {/* RULES + TABLE */}
                <div className="px-4 md:px-10 mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 md:gap-8">

                    {/* LEFT */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* same */}
                    </div>

                    {/* TABLE */}
                    <div className="bg-[#0A1B26] border border-[#112B36] rounded-2xl overflow-x-auto">

                        <div className="flex justify-between px-4 md:px-6 py-4 md:py-5">
                            <h3 className="text-sm md:text-base">Event Standings</h3>
                            <span className="bg-[#07171F] text-[#2EE6C9] text-xs px-2 md:px-3 py-1 rounded">
                                LIVE
                            </span>
                        </div>

                        <div className="min-w-[500px]">
                            <div className="grid grid-cols-4 px-4 md:px-6 py-3 bg-[#132733] text-xs text-[#6B7F8B]">
                                <span>Rank</span>
                                <span>Address</span>
                                <span>Trading</span>
                                <span>24h</span>
                            </div>

                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="grid grid-cols-4 px-4 md:px-6 py-4 md:py-5 border-t border-[#112B36] text-sm">
                                    <span>{i}</span>
                                    <span>0x71C...{i}</span>
                                    <span>$4.29M</span>
                                    <span className="text-[#2EE6C9]">+12%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="px-4 md:px-10 mt-16 md:mt-20 pb-20 md:pb-24">
                    <h2 className="text-2xl md:text-[36px] mb-6 md:mb-10">
                        Frequently Asked Questions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* same */}
                    </div>
                </div>

            </div>
        </div>
    );
}