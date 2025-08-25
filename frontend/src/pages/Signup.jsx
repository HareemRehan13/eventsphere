import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Attendee");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await api("/auth/signup", {
        method: "POST",
        body: { name, email, password, role },
      });

      // Token save + auth context update
      login(data);

      nav("/dashboard");
    } catch (e) {
      setErr(e.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 p-6 rounded-2xl border bg-white shadow"
      >
        <h1 className="text-2xl font-semibold">Create account</h1>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="Attendee">Attendee</option>
            <option value="Organizer">Organizer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg p-2 font-medium hover:bg-indigo-700 transition"
        >
          Sign up
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
