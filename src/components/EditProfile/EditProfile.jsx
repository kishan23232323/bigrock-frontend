import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  resendVerificationEmail,
  updateUserProfile,
  changePassword,
} from "../../services/authservices/authapi";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ===============================
     PROFILE UPDATE FORM
  =============================== */
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  /* ===============================
     PASSWORD CHANGE FORM
  =============================== */
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm();

  /* ===============================
     HANDLERS
  =============================== */
  const onProfileUpdate = async (data) => {
    try {
      setLoading(true);
      await updateUserProfile({ name: data.name });
      toast.success("Profile updated successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Profile update failed");
      setLoading(false);
    }
  };

  const onPasswordChange = async (data) => {
    try {
      setLoading(true);
      await changePassword(data);
      toast.success("Password changed successfully");
      resetPasswordForm();
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Password change failed");
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail(user.email);
      toast.success("Verification email sent!");
      navigate("/profile");
      
    } catch (err) {
      toast.error(err.message || "Failed to resend verification email");
    }
  };

  return (
    <div
      className="flex p-4 justify-center items-center min-h-screen"
      style={{ background: "#08111B" }}
    >
      <div className="backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border bg-transparent border-gray-700">

        <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">
          Edit Profile
        </h2>

        {/* ===============================
            EMAIL SECTION
        =============================== */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-1">Email</label>
          <div className="flex items-center justify-between bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-600">
            <span className="text-slate-300">{user?.email}</span>

            {user?.isVerified ? (
              <ShieldCheck className="text-cyan-400" />
            ) : (
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                <button
                  onClick={handleResendVerification}
                  className="text-xs text-red-400 hover:underline"
                  type="button"
                >
                  Verify Email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===============================
            UPDATE NAME
        =============================== */}
        <form onSubmit={handleProfileSubmit(onProfileUpdate)}>
          <div className="mb-5">
            <label className="block mb-1 font-semibold text-gray-400">
              Name
            </label>
            <input
              {...registerProfile("name", { required: "Name is required" })}
              className="w-full px-4 py-2 bg-gray-800/50 border text-slate-300 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
            />
            {profileErrors.name && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.name.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 rounded-lg font-semibold mb-6"
            style={{
              background: "linear-gradient(135deg, #06eef5, #00ffa3)",
              boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
              color: "#000",
            }}
          >
            Update Profile
          </button>
        </form>

        {/* ===============================
            CHANGE PASSWORD
        =============================== */}
        <form onSubmit={handlePasswordSubmit(onPasswordChange)}>
          <h3 className="text-lg font-semibold text-slate-200 mb-3">
            Change Password
          </h3>

          <div className="mb-4">
            <input
              type="password"
              {...registerPassword("oldPassword", {
                required: "Current password is required",
              })}
              placeholder="Current Password"
              className="w-full px-4 py-2 bg-gray-800/50 border text-slate-300 border-gray-600 rounded-lg"
            />
            {passwordErrors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              {...registerPassword("newPassword", {
                required: "New password is required",
              })}
              placeholder="New Password"
              className="w-full px-4 py-2 bg-gray-800/50 border text-slate-300 border-gray-600 rounded-lg"
            />
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.newPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 rounded-lg font-semibold"
            style={{
              background: "linear-gradient(135deg, #06eef5, #00ffa3)",
              boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
              color: "#000",
            }}
          >
            Change Password
          </button>
        </form>

      </div>
    </div>
  );
}
