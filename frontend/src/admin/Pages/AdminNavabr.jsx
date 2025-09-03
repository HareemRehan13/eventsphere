import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [showDropdowns, setShowDropdowns] = useState({});
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/login");
    alert("Logged out successfully!"); // simple professional feedback
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdowns({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setShowDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "15px",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "0.3s",
  };

  const navLinkHover = {
    background: "#ff6b35",
    color: "#fff",
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
      {/* Left: Logo */}
      <div>
        <Link
          to="/admin/home"
          style={{
            color: "#ff6b35",
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          🎟️ EventSphere Admin
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        ref={dropdownRef}
      >
        <Link to="/admin/home" style={navLinkStyle}>
          Dashboard / Home
        </Link>

        {/* Dropdown Links */}
        {[
          { name: "Expo Management", link: "/admin/expo" },
          { name: "Event Management", link: "/admin/event" },
          { name: "Exhibitor Management", link: "/admin/exhibitor" },
          { name: "Attendee Management", link: "/admin/attendee" },
          { name: "Booth Management", link: "/admin/booth" },
          { name: "Schedule Management", link: "/admin/schedule" },
          { name: "Analytics & Reports", link: "/admin/analytics" },
          { name: "Feedback", link: "/admin/feedback" },
          { name: "Registration Approvals", link: "/admin/registration" },
          { name: "Tickets", link: "/admin/tickets" },
          { name: "Notifications", link: "/admin/notifications" },
          { name: "Users", link: "/admin/users" },
          { name: "Venue", link: "/admin/venue" },
        ].map((item) => (
          <div
            key={item.name}
            style={{ position: "relative" }}
            onMouseEnter={() => toggleDropdown(item.name)}
            onMouseLeave={() => toggleDropdown(item.name)}
          >
            <button
              style={{
                ...navLinkStyle,
                background: showDropdowns[item.name] ? "#ff6b35" : "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {item.name} ⬇
            </button>

            {showDropdowns[item.name] && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  minWidth: "200px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  zIndex: 2000,
                }}
              >
                <Link
                  to={item.link}
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    color: "#0a192f",
                    textDecoration: "none",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "#ff6b35") ||
                    (e.target.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent") ||
                    (e.target.style.color = "#0a192f")
                  }
                >
                  Manage
                </Link>
              </div>
            )}
          </div>
        ))}
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

export default AdminNavbar;
