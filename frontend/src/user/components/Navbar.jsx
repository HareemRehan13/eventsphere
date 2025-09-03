import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#0a192f",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.6)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left: Logo / Dashboard */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/Home"
          style={{
            color: "#ff6b35",
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          🎟️ EventSphere
        </Link>

        <Link
          to="/Home"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Dashboard / Home
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div style={{ display: "flex", gap: "24px" }}>
        <Link to="/expo-list" style={navLinkStyle}>
          Expo List
        </Link>
        <Link to="/schedule" style={navLinkStyle}>
          Event Schedule
        </Link>
        <Link to="/registrations" style={navLinkStyle}>
          My Registrations
        </Link>
        <Link to="/tickets" style={navLinkStyle}>
          Tickets
        </Link>
        <Link to="/feedback" style={navLinkStyle}>
          Feedback
        </Link>
        <Link to="/notifications" style={navLinkStyle}>
          Notifications
        </Link>
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        style={{
          background: "#ff6b35",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  transition: "0.3s",
};

export default Navbar;
