import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Enter new password");

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded"/>
          <button type="submit" disabled={loading} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
