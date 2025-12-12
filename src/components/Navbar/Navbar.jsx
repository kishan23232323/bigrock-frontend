import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaExchangeAlt, FaGift, FaUser, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LogoutBtn } from "./LogoutBtn";

const Navbar = () => {
  const location = useLocation();
  const { accessToken, user } = useSelector((state) => state.auth || {});
  const isLoggedIn = Boolean(accessToken);
  const isAdmin = user?.role === "admin";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getP2PState = () => {
    if (location.pathname !== "/p2p") {
      return { backgroundLocation: location };
    }
    return undefined;
  };

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  const mobileLinkClass = ({ isActive }) =>
    isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink;

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home", icon: <AiFillHome /> },
    { to: "/p2p", label: "P2P", icon: <FaExchangeAlt />, state: getP2PState() },
    { to: "/airdrop", label: "Airdrop", icon: <FaGift /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    ...(isAdmin ? [{ to: "/admin", label: "Admin", icon: <FaUser /> }] : []),
  ];

  return (
    <>
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoTextPrimary}>Sonic</span>
            <span className={styles.logoTextSecondary}>Exchange</span>
          </div>

          {/* Desktop Menu */}
          <ul className={styles.navMenu}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={linkClass}
                  to={item.to}
                  state={item.state}
                  onClick={handleNavClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* Desktop Auth Button */}
            <li className={styles.authButton}>
              {isLoggedIn ? (
                <LogoutBtn/>
              ) : (
                <NavLink className={linkClass} to="/login">
                  Join Now
                </NavLink>
              )}
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileDropdown}>
            <div className={styles.mobileMenuItems}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={mobileLinkClass}
                  to={item.to}
                  state={item.state}
                  onClick={handleNavClick}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}

              {/* Mobile Auth Button */}
              <div className={styles.mobileAuthSection}>
                {isLoggedIn ? (
                  <div className={styles.mobileLogoutWrapper}>
                    <LogoutBtn />
                  </div>
                ) : (
                  <NavLink
                    className={mobileLinkClass}
                    to="/login"
                    onClick={handleNavClick}
                  >
                    <FaUserPlus />
                    <span>Join Now</span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
