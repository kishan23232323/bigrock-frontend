import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { applyForKolApi } from "../../services/Swap/swapapi";

export default function KolApply() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await applyForKolApi(formData);

      toast.success(res?.message || "Application submitted!");

      setFormData({
        fullName: "",
        email: ""
      });

    } catch (err) {
      toast.error(err?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#08111B" }}>
      
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Apply as KOL</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-gray-800/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block pl-10 p-2.5 placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your registered email"
                className="w-full bg-gray-800/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block pl-10 p-2.5 placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-slate-300 font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-cyan-800 rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(6,238,245,0.3)] hover:shadow-[0_0_30px_rgba(6,238,245,0.5)]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Apply Now"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Applications are reviewed manually. You’ll be notified once approved.
        </p>

      </div>
    </div>
  );
}