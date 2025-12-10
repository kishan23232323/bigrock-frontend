import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authservices/authapi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "../../store/authslice";
import { useLocation } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlReferral = params.get("referral");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", response.data.user._id);

      toast.success("Registration successful!");
      navigate("/");
      reset();
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error.message || "Registration failed!");
    }
  };

  useEffect(() => {
    if (urlReferral) setValue("referral", urlReferral);
  }, [urlReferral, setValue]);

  return (
    <div className="flex p-6 items-center justify-center min-h-screen">
      <ToastContainer autoClose={3000} position="top-right" />
      <div className="w-full max-w-md bg-transparent backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-slate-300 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full text-slate-200 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                // UNCOMMENT THE LINE BELOW TO ENABLE EMAIL FORMAT VALIDATION at time of final deployment
                // pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              className="mt-1 w-full px-4 py-2 border text-slate-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Create Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full px-4 py-2 border text-slate-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* OPTIONAL REFERRAL FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              {...register("referral", { required: false })}
              className="mt-1 w-full px-4 py-2 border text-slate-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter referral code"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
            background: "linear-gradient(135deg, #06eef5, #00ffa3)",
            boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
            
          }}
            className="w-full text-black font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02]"
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 30px rgba(6, 238, 245, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(6, 238, 245, 0.4)";
            }}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?
            <Link to="/login">
              <span className="text-indigo-100 font-semibold hover:underline cursor-pointer">
                Log in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
