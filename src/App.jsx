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
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./components/EditProfile/EditProfile";
import Terms from "./pages/Terms";
import ScrollToTop from "./ScrollToTop";
import JobApplication from "./pages/JobApplication";
import AdminAgentApplications from "./pages/AdminPanel/AdminAgent";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import AdminProtected from "./components/AdminProtected";
import AdminAirdropPanel from "./pages/AdminPanel/AdminAirdropPanel";


function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const token = accessToken || localStorage.getItem("accessToken");

    if (!token) {
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
  }, [accessToken, dispatch]);

  return (
    <div className="appWrapper">
      <NavBar />
      <ScrollToTop />
      <div className="contentWrapper">
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
          <Route path="/agent" element={
            <Protected>
              <Agent />
            </Protected>
          }
          />

          <Route path="/admin/agents-applications" element={
            <AdminProtected>
              <AdminAgentApplications />
            </AdminProtected>} />

          <Route path="/admin/orders" element={
            <AdminProtected>
              <AdminOrders />
            </AdminProtected>} />

          <Route path="/admin" element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>} />

          <Route path="/admin/airdrop-panel" element={
            <AdminProtected>
              <AdminAirdropPanel />
            </AdminProtected>} />

          <Route path="/airdrop" element={<Airdrop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/p2p" element={<P2P />} />
          <Route path="/p2p/sell" element={<P2P mode="sell" />} />
          <Route path="/p2p/buy" element={<P2P mode="buy" />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/apply" element={<JobApplication />} />
          <Route path="/sonic-insentive" element={<Sonic_Incentive />} />
          <Route path="/presale" element={<Presale />} />
          <Route path="/info" element={<Info />} />
          <Route path="/earninfo" element={<Earn_info />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/edit-profile" element={
            <Protected>
              <EditProfile />
            </Protected>
          } />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>

      <Footer />
      <ToastContainer autoClose={3000} position="top-right" />
    </div>
  );
}

export default App;
