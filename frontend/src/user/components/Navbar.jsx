import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ npm i react-toastify
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      const u = parsed?.user ? parsed.user : parsed;

      setUser({
        username: u?.username || u?.name || "User",
        email: u?.email || "",
        role: u?.role || "attendee",
        profilePicture: u?.profilePicture || u?.avatar || "",
      });
    } catch (e) {
      console.error("Failed to parse user:", e);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setShowDropdown(false);

    toast.success("You have been logged out successfully.");
    navigate("/login");
  };

  const capitalize = (txt) =>
    txt ? txt.charAt(0).toUpperCase() + txt.slice(1) : "";

  return (
    <>
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
            {user ? "My Profile " : "Login "}
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
                width: "260px",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
                zIndex: 2000,
              }}
            >
              {user ? (
                <>
                  {/* User info */}
                  <div style={{ textAlign: "center", marginBottom: "12px" }}>
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="profile"
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: "cover",
                          borderRadius: "50%",
                          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          background: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "22px",
                          color: "#666",
                          margin: "0 auto",
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <p style={{ margin: "6px 0", fontSize: "15px" }}>
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p style={{ margin: "6px 0", fontSize: "15px" }}>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p
                    style={{
                      margin: "6px 0 12px",
                      fontSize: "15px",
                      color: "#444",
                    }}
                  >
                    <strong>Role:</strong> {capitalize(user.role) || "Attendee"}
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
                      transition: "0.3s",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <p style={{ margin: "0 0 12px", fontSize: "15px" }}>
                    You are not logged in.
                  </p>
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
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  transition: "0.3s",
};

export default Navbar;
