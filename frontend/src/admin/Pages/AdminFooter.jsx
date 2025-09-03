import React from "react";
import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <footer
      style={{
        background: "#0a192f",
        color: "#fff",
        padding: "20px 40px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.3)",
        fontSize: "14px",
      }}
    >
      {/* Left: Copyright */}
      <div>
        © {new Date().getFullYear()} EventSphere Admin. All rights reserved.
      </div>

      {/* Center: Quick Links */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/admin/home" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/admin/expo" style={linkStyle}>
          Expo
        </Link>
        <Link to="/admin/event" style={linkStyle}>
          Events
        </Link>
        <Link to="/admin/users" style={linkStyle}>
          Users
        </Link>
        <Link to="/admin/analytics" style={linkStyle}>
          Analytics
        </Link>
      </div>

      {/* Right: Contact Info */}
      <div style={{ textAlign: "right" }}>
        <p style={{ margin: 0 }}>Contact: admin@eventsphere.com</p>
        <p style={{ margin: 0 }}>Phone: +1 (555) 123-4567</p>
      </div>
    </footer>
  );
};

const linkStyle = {
  color: "#ff6b35",
  textDecoration: "none",
  transition: "0.3s",
};

export default AdminFooter;
