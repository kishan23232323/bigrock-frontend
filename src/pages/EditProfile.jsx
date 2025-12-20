import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { User, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { updateUserProfile } from "../services/authservices/authapi";
import { setCredentials } from "../store/authslice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, accessToken, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserProfile({ name: formData.name }, accessToken);
      
      // Assuming the API returns the updated user object directly or in a data property
      const updatedUser = res.data?.user || res; 

      dispatch(setCredentials({ 
        user: { ...user, ...updatedUser }, 
        accessToken, 
        refreshToken: localStorage.getItem("refreshToken") 
      }));

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#08111B" }}>
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center mb-8">
          <Link to="/profile" className="text-gray-400 hover:text-cyan-400 transition-colors mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block pl-10 p-2.5 placeholder-gray-500 focus:outline-none transition-colors"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-gray-800/30 border border-gray-700 text-gray-400 text-sm rounded-lg block pl-10 p-2.5 cursor-not-allowed"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-black font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-cyan-800 rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(6,238,245,0.3)] hover:shadow-[0_0_30px_rgba(6,238,245,0.5)]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;