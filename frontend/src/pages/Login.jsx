import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(err.response?.data?.message || "❌ Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0D2241FF, #172a45)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "30px",
          borderRadius: "12px",
          background: "#0a192f",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.6)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "26px", color: "#ff6b35" }}>
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              margin: "12px 0",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ff6b35",
              background: "#112240",
              fontSize: "15px",
              outline: "none",
              color: "#fff",
            }}
          />

          {/* Password with Eye 👁️ */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                margin: "12px 0",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ff6b35",
                background: "#112240",
                fontSize: "15px",
                outline: "none",
                color: "#fff",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#ff6b35",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "18px",
              padding: "12px",
              background: "#ff6b35",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "5px",
              background: "#dc3545",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        <div style={{ marginTop: "15px", fontSize: "14px" }}>
          <Link to="/forgot-password" style={{ color: "#ff6b35", fontWeight: "bold" }}>
            Forgot Password?
          </Link>
          <br />
          <span>Don’t have an account? </span>
          <Link to="/signup" style={{ color: "#ff6b35", fontWeight: "bold" }}>
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
