import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/authservices/authapi";
import { useNavigate } from "react-router-dom";

const RESEND_TIME = 45;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async ({ email }) => {
    try {
      setLoading(true);
      await forgotPassword(email);
      toast.success("Password reset link sent to email");
      setTimer(RESEND_TIME); // start 45 sec timer
    } catch (err) {
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
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
          Forgot Password
        </h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          We’ll send you a password reset link
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-gray-400">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full px-4 py-2 bg-gray-800/50 border text-slate-300 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            placeholder="your@email.com"
            disabled={timer > 0}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit / Timer */}
        <button
          type="submit"
          disabled={timer > 0 || loading}
          style={{
            background: "linear-gradient(135deg, #06eef5, #00ffa3)",
            boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
            color: "#000000",
          }}
          className={`w-full py-2 rounded-lg font-semibold transition duration-300
            ${
              timer > 0 || loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:shadow-lg hover:scale-[1.02]"
            }`}
        >
          {timer > 0
            ? `Resend in ${timer}s`
            : loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Remember your password?{" "}
          <span
            className="text-blue-100 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
