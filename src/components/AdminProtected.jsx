// PURELY FOR ADMIN ROUTE SECURITY
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const role = useSelector((state) => state.auth.user?.role);

  const isAuthenticated = Boolean(accessToken);
  const isAdmin = role === "admin";

  useEffect(() => {
    // Not logged in
    if (!isAuthenticated) {
      navigate("/login");
    }
    // Logged in but not admin
    else if (!isAdmin) {
      navigate("/");
    }

    setLoader(false);
  }, [isAuthenticated, isAdmin, navigate]);

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08111b] text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtected;
