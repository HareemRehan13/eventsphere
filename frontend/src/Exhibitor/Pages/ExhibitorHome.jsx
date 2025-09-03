// src/admin/exhibitor/ExhibitorHome.jsx
import React from "react";
import ExhibitorNavbar from "../Exhibitor/ExhibitorNavbar";
import ExhibitorCarousel from "../Exhibitor/ExhibitorCarousel";
import ExhibitorFooter from "../Exhibitor/ExhibitorFooter";

const ExhibitorHome = () => {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <ExhibitorNavbar />

      {/* Carousel */}
      <ExhibitorCarousel />

      {/* Main Content */}
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", color: "#0d2241", marginBottom: "20px" }}>
          Welcome to Your Exhibitor Panel
        </h1>
        <p style={{ fontSize: "18px", color: "#333", maxWidth: "800px", margin: "0 auto" }}>
          Here you can manage your booth, check your schedule, track registrations, view tickets, and receive notifications.
          Use the navigation above to explore your dashboard features.
        </p>
      </div>

      {/* Footer */}
      <ExhibitorFooter />
    </div>
  );
};

export default ExhibitorHome;
