import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // navigation ke liye

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Backend se user + token
      const { token, user } = res.data;

      // localStorage me save
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Parent ko inform karne ke liye
      if (onLogin) {
        onLogin(user);
      }

      setError("");
      alert("✅ Login successful!");
    } catch (err) {
      console.error(err);
      setError("❌ Invalid email or password");
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
        >
          Login
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
