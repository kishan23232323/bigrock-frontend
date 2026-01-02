import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifiedOnly = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    if (!user.isVerified) {
      toast.warning("Please verify your email first");
      navigate("/edit-profile", { replace: true });
    }
  }, [user, navigate]);

  if (!user || !user.isVerified) return null;

  return children;
};

export default VerifiedOnly;
