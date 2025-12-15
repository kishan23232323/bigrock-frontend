import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authservices/authapi";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ newPassword }) => {
    try {
      await resetPassword(token, newPassword);
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Reset failed");
    }
  };

  return (
    <div
      className="flex p-4 sm:p-6 justify-center items-center h-screen"
      style={{ background: "#08111B" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm border bg-transparent border-gray-700"
      >
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-200 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Enter your new password below
        </p>

        {/* New Password */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-gray-400">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-gray-800/50 border text-slate-200 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.newPassword || "Passwords do not match",
            })}
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-gray-800/50 border text-slate-200 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg, #06eef5, #00ffa3)",
            boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
            color: "#000000",
          }}
          className="w-full py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02]"
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 30px rgba(6, 238, 245, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 20px rgba(6, 238, 245, 0.4)";
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
