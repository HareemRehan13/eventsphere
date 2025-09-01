import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // optional loader
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login button clicked", { email, password });
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      // Adjust this based on your backend response
      // Example: { success: true, user: {...}, token: "..." }
      const user = res.data.user || (res.data.data && res.data.data.user);
      const token = res.data.token || (res.data.data && res.data.data.token);

      if (!user || !token) {
        setError("Login failed: invalid response from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      if (onLogin) onLogin(user);

      setError("");
      setLoading(false);

      navigate("/"); // redirect to Home
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(err.response?.data?.message || "❌ Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div style={{ marginTop: "15px" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
        <br />
        <span>Don’t have an account? </span>
        <Link to="/signup">Sign up here</Link>
      </div>
    </div>
  );
};

export default Login;
