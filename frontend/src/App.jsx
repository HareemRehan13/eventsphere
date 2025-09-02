import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgotPassword";  // 👈 new import
// import ResetPassword from "./pages/ResetPassword";    // 👈 new import
import OrganizerDashboard from "./admin/views/Dashboard/Dashboard.jsx";
import AttendeeHome from "./user/pages/Home.jsx"; 
import Home from "./user/pages/Home.jsx";
// import Home from "./user/pages/Home.jsx"; // ye wala path check kro khi ismy to nhi msla?
function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  return user && roles.includes(user.role) ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} /> {/* 👈 added */}
      {/* <Route path="/reset-password" element={<ResetPassword />} />   👈 added */}
      
      {/* HomeRoutes  */}
      <Route path="/Home" element={<Home/>}/>

      {/* Organizer */}
      <Route
        path="/organizer/dashboard"
        element={
          <PrivateRoute roles={['organizer']}>
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />

    

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
