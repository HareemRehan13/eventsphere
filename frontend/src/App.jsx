import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AttendeeHome from "./user/pages/Home.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Example private route */}
        <Route path="/attendee/home" element={<AttendeeHome />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer />
    </>
  );
}
