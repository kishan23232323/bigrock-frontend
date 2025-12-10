import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../../store/authslice";
import { logoutUser } from "../../services/authservices/authapi";

export function LogoutBtn({ onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      if (onClick) onClick();
    } catch (error) {
      console.error("Logout Error:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      navigate("/");
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-300 transition"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}