import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "attendee",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      setMessage({
        text: res.data.message || "Signup successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Error signing up",
        type: "error",
      });
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create Account</h2>

        {message.text && (
          <div
            style={{
              ...styles.message,
              background: message.type === "success" ? "#28a745" : "#dc3545",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="attendee">Attendee</option>
            <option value="exhibitor">Exhibitor</option>
          </select>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// ✅ Internal CSS theme
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0D2241FF, #172a45)", // 🔥 background updated
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    padding: "30px",
    borderRadius: "12px",
    background: "#0a192f",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#ff6b35",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    margin: "12px 0",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ff6b35",
    background: "#112240",
    fontSize: "15px",
    outline: "none",
    color: "#fff",
    transition: "0.3s",
  },
  select: {
    width: "100%",
    margin: "12px 0",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ff6b35",
    background: "#112240",
    fontSize: "15px",
    outline: "none",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  passwordWrapper: {
    position: "relative",
    margin: "12px 0",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    color: "#ff6b35",
  },
  button: {
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
  },
  buttonHover: {
    background: "#e85b50",
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#fff",
  },
  link: {
    color: "#ff6b35",
    textDecoration: "none",
    fontWeight: "bold",
  },
  message: {
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    color: "#fff",
    fontWeight: "bold",
  },
};
