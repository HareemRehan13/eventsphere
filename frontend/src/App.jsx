import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OrganizerDashboard from "./admin/views/Dashboard/Dashboard.jsx";
import AttendeeHome from "./user/pages/Home.jsx"; 

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  return user && roles.includes(user.role) ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Organizer */}
      <Route
        path="/organizer/dashboard"
        element={
          <PrivateRoute roles={['organizer']}>
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />

      {/* Attendee */}
      <Route
        path="/attendee/home"
        element={
          <PrivateRoute roles={['attendee']}>
            <AttendeeHome />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
