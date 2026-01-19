import { useEffect, useState } from "react";
import {
    getSupportQueries,
    updateSupportQueryStatus
} from "../../services/customerSupport/supportapi";

const PAGE_SIZE = 10;

const CustomerSupportPanel = () => {
    const token = localStorage.getItem("accessToken");

    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchQueries = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const data = await getSupportQueries({
                search,
                page,
                limit: PAGE_SIZE,
                token
            });

            setQueries(Array.isArray(data?.data) ? data.data : []);
            setTotal(typeof data?.total === "number" ? data.total : 0);
        } catch (error) {
            console.error("Fetch queries error:", error);
            setQueries([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    const markResolved = async (id) => {
        if (!token) return;

        try {
            await updateSupportQueryStatus({
                queryId: id,
                status: "resolved",
                token
            });
            fetchQueries();
        } catch (error) {
            console.error("Resolve query error:", error);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, [search, page, token]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#07121f] to-[#04070d] p-8 text-gray-200">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-wide text-white">
                    Customer Support Dashboard
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    Manage and resolve user support queries
                </p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by query or keyword..."
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
                            <th className="px-6 py-4 text-left font-semibold">Query</th>
                            <th className="px-6 py-4 text-left font-semibold">Status</th>
                            <th className="px-6 py-4 text-center font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                                    Loading queries...
                                </td>
                            </tr>
                        ) : queries.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                    No support queries found
                                </td>
                            </tr>
                        ) : (
                            queries.map((q) => (
                                <tr
                                    key={q._id}
                                    className="border-t border-[#1e2a3a] hover:bg-[#0f1d30]/60 transition"
                                >
                                    {/* Email */}
                                    <td className="px-6 py-4 text-gray-300">
                                        {q.email || "—"}
                                    </td>

                                    {/* Query */}
                                    <td className="px-6 py-4 text-gray-200 max-w-xl truncate">
                                        {q.query}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${q.status === "resolved"
                                                    ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                                    : q.status === "in_progress"
                                                        ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                                                        : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                                                }`}
                                        >
                                            {q.status.replace("_", " ").toUpperCase()}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4 text-center">
                                        {q.status !== "resolved" ? (
                                            <button
                                                onClick={() => markResolved(q._id)}
                                                className="
    relative z-10
    rounded-lg px-4 py-2 text-xs font-semibold
    bg-gradient-to-r from-cyan-500 to-blue-600
    text-white
    shadow-md
    transition-all duration-200 ease-out
    hover:from-cyan-400 hover:to-blue-500
    hover:shadow-lg
    hover:ring-2 hover:ring-cyan-400/40
    active:scale-95
    cursor-pointer
  "
                                            >
                                                Mark Resolved
                                            </button>

                                        ) : (
                                            <span className="text-gray-500 text-xs">—</span>
                                        )}
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

export default CustomerSupportPanel;
