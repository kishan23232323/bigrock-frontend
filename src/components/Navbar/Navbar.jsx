import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaExchangeAlt, FaGift, FaUser, FaUserPlus } from "react-icons/fa"; // changed icon for Join Now
import { useSelector } from "react-redux";
import { LogoutBtn } from "./LogoutBtn";

const Navbar = () => {
  const location = useLocation();
  const { accessToken, user } = useSelector((state) => state.auth || {});
  const isLoggedIn = Boolean(accessToken);
  const isAdmin = user?.role === "admin";

  const getP2PState = () => {
    if (location.pathname !== "/p2p") {
      return { backgroundLocation: location };
    }
    return undefined;
  };

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? `${styles.mobileItem} ${styles.mobileActive}`
      : styles.mobileItem;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoTextPrimary}>Sonic</span>
            <span className={styles.logoTextSecondary}>Exchange</span>
          </div>

          <ul className={styles.actions}>
            <li>
              <NavLink className={linkClass} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={linkClass} to="/p2p" state={getP2PState()}>
                P2P
              </NavLink>
            </li>
            <li>
              <NavLink className={linkClass} to="/airdrop">
                Airdrop
              </NavLink>
            </li>
            <li>
              <NavLink className={linkClass} to="/profile">
                Profile
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink className={linkClass} to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
            {isLoggedIn ? (
              <li className={styles.logoutWrapper}>
                <LogoutBtn />
              </li>
            ) : (
              <li>
                <NavLink className={linkClass} to="/login">
                  Join Now
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className={styles.mobileNav}>
        <NavLink className={mobileLinkClass} to="/">
          <AiFillHome />
          <span>Home</span>
        </NavLink>
        <NavLink className={mobileLinkClass} to="/p2p" state={getP2PState()}>
          <FaExchangeAlt />
          <span>P2P</span>
        </NavLink>
        <NavLink className={mobileLinkClass} to="/airdrop">
          <FaGift />
          <span>Airdrop</span>
        </NavLink>
        <NavLink className={mobileLinkClass} to="/profile">
          <FaUser />
          <span>Profile</span>
        </NavLink>
        {isAdmin &&  <NavLink className={mobileLinkClass} to="/admin">
          <FaUser />
          <span>Admin</span>
        </NavLink>
        }
        {/* Show Join Now at the end if not logged in (mobile) */}
        {!isLoggedIn ? (
          <NavLink className={mobileLinkClass} to="/login">
            <FaUserPlus /> {/* changed icon */}
            <span>Join Now</span>
          </NavLink>
        ) : (
        <NavLink className={styles.logoutWrapper}>
                <LogoutBtn />
              </NavLink>
            )}
      </div>
    </>
  );
};

export default Navbar;
