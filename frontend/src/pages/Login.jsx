import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-[#C97B63] mb-3">
            Account
          </p>
          <h1
            className="text-3xl font-bold tracking-tight text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Log in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-[#8C8C8C] mb-2">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-[#EAE8E3] py-3 text-[#1A1A1A] placeholder:text-[#C4C4C4] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="Your username"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-[#8C8C8C] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#EAE8E3] py-3 text-[#1A1A1A] placeholder:text-[#C4C4C4] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-xs tracking-[0.05em] text-[#B85C4A]">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#C97B63] transition-colors"
          >
            Log in
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-[#8C8C8C]">
          Don't have an account?{' '}
          <NavLink
            to="/signup"
            className="text-[#1A1A1A] hover:text-[#C97B63] transition-colors underline underline-offset-4"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}