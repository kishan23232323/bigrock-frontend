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
      
    >
      <div className="flex  " >
        <LogOut className=" w-5 " />
      Logout
      </div>
    </button>
  );
}