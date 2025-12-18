import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Hero/Home";
import Airdrop from "./pages/Airdrop";
import Profile from "./pages/Profile";
import P2P from "./pages/P2P";
import Footer from "./components/Footer";
import { Protected } from "./components/AuthLayout";
import Login from "./components/Login/Login";
import Register from "./components/Signup/SignUp";
import AdminOrders from "./pages/AdminPanel/AdminOrders";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./services/authservices/authapi";
import { logout, setCredentials } from "./store/authslice";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Career from "./pages/Career";
import Sonic_Incentive from "./pages/Sonic_Incentive";
import Agent from "./pages/Agent";
import Presale from "./pages/Presale";
import Info from "./pages/Info";
import Earn_info from "./pages/Earn_info";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = accessToken || localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      dispatch(logout());
      return;
    }

    getUserProfile(token)
      .then((userData) => {
        if (userData) {
          dispatch(
            setCredentials({
              user: userData,
              accessToken: token,
            })
          );
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("App.jsx :: error in getUserProfile", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });;
  }, [accessToken, dispatch]);

  return (
    <div className="appWrapper">
      <NavBar />

      <div className="contentWrapper">
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "5px solid rgba(6,238,245,0.15)",
                borderTopColor: "#06eef5",
                animation: "spin 1s linear infinite",
              }}
            />
            <div style={{ color: "#aaa" }}>Loading...</div>

            <style>
              {`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}
            </style>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <Protected authenication={false}>
                  <Login />
                </Protected>
              }
            />
            <Route
              path="/signup"
              element={
                <Protected authenication={false}>
                  <Register />
                </Protected>
              }
            />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/p2p" element={<P2P />} />
            <Route path="/p2p/sell" element={<P2P mode="sell" />} />
            <Route path="/p2p/buy" element={<P2P mode="buy" />} />
            <Route path="/admin" element={<AdminOrders />} />
            <Route path="/about" element={<About />} />
            <Route path="/career" element={<Career />} />
            <Route path="/sonic-insentive" element={<Sonic_Incentive />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/presale" element={<Presale />} />
            <Route path="/info" element={<Info />} />
              <Route path="/earninfo" element={<Earn_info />} />

            
          </Routes>
        )}
      </div>

      <Footer />
      <ToastContainer autoClose={3000} position="top-right" />
    </div>
  );
}

export default App;
