import React from "react";
import { Link } from "react-router-dom";

const ExhibitorFooter = () => {
  return (
    <footer
      style={{
        background: "#0a192f",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "50px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* About Section */}
        <div style={{ flex: "1 1 220px", marginBottom: "20px" }}>
          <h3 style={{ color: "#ff6b35", marginBottom: "15px" }}>About Exhibitor Panel</h3>
          <p style={{ lineHeight: "1.6" }}>
            Manage your booth, track your schedule, view tickets, and stay updated with feedback and notifications.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: "1 1 220px", marginBottom: "20px" }}>
          <h3 style={{ color: "#ff6b35", marginBottom: "15px" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/exhibitor/home" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/exhibitor/booth" style={{ color: "#fff", textDecoration: "none" }}>My Expo / Booth</Link>
            </li>
            <li>
              <Link to="/exhibitor/schedule" style={{ color: "#fff", textDecoration: "none" }}>My Schedule</Link>
            </li>
            <li>
              <Link to="/exhibitor/registration-status" style={{ color: "#fff", textDecoration: "none" }}>Registration Status</Link>
            </li>
            <li>
              <Link to="/exhibitor/tickets" style={{ color: "#fff", textDecoration: "none" }}>Tickets</Link>
            </li>
            <li>
              <Link to="/exhibitor/feedback" style={{ color: "#fff", textDecoration: "none" }}>Feedback</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div style={{ flex: "1 1 220px", marginBottom: "20px" }}>
          <h3 style={{ color: "#ff6b35", marginBottom: "15px" }}>Contact</h3>
          <p>Email: <a href="mailto:support@example.com" style={{ color: "#fff" }}>support@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" style={{ color: "#fff" }}>+1 234 567 890</a></p>
          <p>Address: 123 Expo Street, City, Country</p>
        </div>

        {/* Social */}
        <div style={{ flex: "1 1 220px", marginBottom: "20px" }}>
          <h3 style={{ color: "#ff6b35", marginBottom: "15px" }}>Follow Us</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="#" style={{ color: "#fff" }}>Facebook</a>
            <a href="#" style={{ color: "#fff" }}>Twitter</a>
            <a href="#" style={{ color: "#fff" }}>LinkedIn</a>
          </div>
        </div>
      </div>

      <hr style={{ borderColor: "#333", margin: "30px 0" }} />

      <p style={{ textAlign: "center", margin: 0 }}>
        &copy; {new Date().getFullYear()} Exhibitor Panel. All rights reserved.
      </p>
    </footer>
  );
};

export default ExhibitorFooter;
