import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { verifyEmail } from "../services/authservices/authapi";
import { setCredentials } from "../store/authslice";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
  if (hasVerified.current) return;
  hasVerified.current = true;

    verifyEmail(token)
      .then((res) => {
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        toast.success("Email verified successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message || "Verification failed");
        navigate("/login");
      });
  }, [token]);

  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <p style={{ color: "#aaa" }}>Verifying your email...</p>
    </div>
  );
};

export default VerifyEmail;
