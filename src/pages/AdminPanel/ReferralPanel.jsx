import { useEffect, useState } from "react";
import { getHighReferralUsers } from "../../services/Referral/referralapi";

const PAGE_SIZE = 10;

const ReferralPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getHighReferralUsers({
                page,
                limit: PAGE_SIZE,
                search
            });

            setUsers(Array.isArray(data?.data) ? data.data : []);
            setTotal(typeof data?.total === "number" ? data.total : 0);
        } catch (error) {
            console.error("Referral fetch error:", error);
            setUsers([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search, page]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#07121f] to-[#04070d] p-8 text-gray-200">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-wide text-white">
                    Referral Points Dashboard
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    Users with referral points earned through referrals.
                </p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="w-full rounded-xl bg-[#0b1624] border border-[#1e2a3a]
          px-4 py-3 text-sm text-gray-200 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-[#1e2a3a] bg-[#0b1624]/80 backdrop-blur shadow-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#0f1d30] text-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold">Email</th>
                            <th className="px-6 py-4 text-left font-semibold">Wallet Address</th>
                            <th className="px-6 py-4 text-right font-semibold">
                                Referral Points
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                                    Loading users...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-t border-[#1e2a3a] hover:bg-[#0f1d30]/60 transition"
                                >
                                    <td className="px-6 py-4 text-gray-200">
                                        {u.email}
                                    </td>

                                    <td className="px-6 py-4 font-mono text-xs text-gray-300">
                                        {u.walletAddress || "—"}
                                    </td>

                                    <td className="px-6 py-4 text-right font-semibold text-cyan-400">
                                        {u.referralPoints}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-4 text-sm">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 rounded-lg border border-[#1e2a3a]
            bg-[#0b1624] hover:bg-[#0f1d30] disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span className="text-gray-400">
                        Page <span className="text-white font-semibold">{page}</span> of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded-lg border border-[#1e2a3a]
            bg-[#0b1624] hover:bg-[#0f1d30] disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReferralPanel;