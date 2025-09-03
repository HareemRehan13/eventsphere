import React from "react";
import AdminNavbar from "../Pages/AdminNavbar";
import AdminFooter from "../Pages/AdminFooter";

const AdminHome = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar at top */}
      <AdminNavbar />

      {/* Main content area */}
      <main style={{ flex: 1, padding: "20px", background: "#f4f6f8" }}>
        <h1>Welcome to EventSphere Admin Dashboard</h1>
        <p>Use the navigation above to manage expos, events, exhibitors, attendees, and more.</p>

        {/* You can add dashboard widgets/cards here */}
      </main>

      {/* Footer at bottom */}
      <AdminFooter />
    </div>
  );
};

export default AdminHome;
