import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const AttendeeFooter = () => {
  return (
    <footer
      style={{
        background: "#111",
        color: "#eee",
        padding: "40px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand / About */}
        <div>
          <h2 style={{ color: "#f39c12", marginBottom: "15px" }}>
            EventSphere
          </h2>
          <p>
            🚀 Connecting <strong>Attendees</strong>, <strong>Exhibitors</strong> 
            & <strong>Organizers</strong> in one powerful Expo Management Platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#f39c12", marginBottom: "15px" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li>
              <Link to="/" style={{ color: "#eee", textDecoration: "none" }}>
                🏠 Dashboard / Home
              </Link>
            </li>
            <li>
              <Link to="/expos" style={{ color: "#eee", textDecoration: "none" }}>
                📅 Expo List
              </Link>
            </li>
            <li>
              <Link to="/schedule" style={{ color: "#eee", textDecoration: "none" }}>
                🕒 Event Schedule
              </Link>
            </li>
            <li>
              <Link to="/registration" style={{ color: "#eee", textDecoration: "none" }}>
                📝 My Registrations
              </Link>
            </li>
          </ul>
        </div>

        {/* Exhibitors */}
        <div>
          <h4 style={{ color: "#f39c12", marginBottom: "15px" }}>For Exhibitors</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li>🔹 Booth Allocation</li>
            <li>🔹 Product Showcases</li>
            <li>🔹 Networking</li>
            <li>🔹 Lead Generation</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 style={{ color: "#f39c12", marginBottom: "15px" }}>Contact Us</h4>
          <p>📍 Downtown Conference Center, New York</p>
          <p>📧 support@eventsphere.com</p>
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#eee" }}
            >
              <Facebook />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#eee" }}
            >
              <Twitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#eee" }}
            >
              <Instagram />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#eee" }}
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #333",
          marginTop: "30px",
          paddingTop: "15px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <p>
          © {new Date().getFullYear()} <strong>EventSphere</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default AttendeeFooter;
