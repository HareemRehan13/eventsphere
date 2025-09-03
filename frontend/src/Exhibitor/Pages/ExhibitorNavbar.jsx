import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ExhibitorNavbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0a192f",
        padding: "10px 20px",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}
    >
      {/* Left: Logo */}
      <div style={{ fontWeight: "bold", fontSize: "20px", color: "#ff6b35" }}>
        Exhibitor Panel
      </div>

      {/* Center: Menu Items */}
      <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
        <li>
          <Link to="/exhibitor/home" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/exhibitor/booth" style={{ color: "#fff", textDecoration: "none" }}>
            My Expo / Booth
          </Link>
        </li>
        <li>
          <Link to="/exhibitor/schedule" style={{ color: "#fff", textDecoration: "none" }}>
            My Schedule
          </Link>
        </li>
        <li>
          <Link
            to="/exhibitor/registration-status"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Registration Status
          </Link>
        </li>
        <li>
          <Link to="/exhibitor/tickets" style={{ color: "#fff", textDecoration: "none" }}>
            Tickets
          </Link>
        </li>
        <li>
          <Link to="/exhibitor/feedback" style={{ color: "#fff", textDecoration: "none" }}>
            Feedback
          </Link>
        </li>
        <li>
          <Link
            to="/exhibitor/notifications"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Notifications
          </Link>
        </li>
      </ul>

      {/* Right: Profile Dropdown */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
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
          {user ? "My Profile ⬇" : "Login ⬇"}
        </button>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              width: "240px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
              zIndex: 2000,
            }}
          >
            {user ? (
              <>
                <p style={{ margin: "6px 0", fontSize: "15px" }}>
                  <strong>Name:</strong> {user.username}
                </p>
                <p style={{ margin: "6px 0", fontSize: "15px" }}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ margin: "6px 0 12px", fontSize: "15px" }}>
                  <strong>Role:</strong> {user.role || "Exhibitor"}
                </p>
                <hr style={{ margin: "10px 0" }} />
                <button
                  onClick={handleLogout}
                  style={{
                    background: "#ff6b35",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  display: "block",
                  background: "#ff6b35",
                  color: "#fff",
                  textAlign: "center",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default ExhibitorNavbar;
