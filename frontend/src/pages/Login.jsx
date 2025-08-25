import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const data = await api('/auth/login', { method: 'POST', body: { email, password } });
      login(data);

      // Role-based redirection
      if (data.role === 'organizer') {
        nav('/organizer/dashboard');
      } else if (data.role === 'attendee') {
        nav('/attendee/home');
      } 
      // else if(data.role === 'exhibitor') nav('/exhibitor/dashboard');
      else nav('/login'); // fallback
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-3 p-6 rounded-2xl border">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-black text-white py-2 rounded">Login</button>
        <div className="text-sm">
          No account? <Link className="underline" to="/signup">Create one</Link>
        </div>
      </form>
    </div>
  );
}
