import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password, phoneNumber, age, email);
    navigate('/');
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
            Sign up
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
              placeholder="Choose a username"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-[#8C8C8C] mb-2">
              Email <span className="normal-case tracking-normal text-[#C4C4C4]">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#EAE8E3] py-3 text-[#1A1A1A] placeholder:text-[#C4C4C4] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="you@example.com"
              autoComplete="email"
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
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-[#8C8C8C] mb-2">
              Phone number
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-transparent border-b border-[#EAE8E3] py-3 text-[#1A1A1A] placeholder:text-[#C4C4C4] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="Your phone number"
              type="tel"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-[#8C8C8C] mb-2">
              Age <span className="normal-case tracking-normal text-[#C4C4C4]">(optional)</span>
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-transparent border-b border-[#EAE8E3] py-3 text-[#1A1A1A] placeholder:text-[#C4C4C4] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="Your age"
              min="1"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#C97B63] transition-colors"
          >
            Sign up
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-[#8C8C8C]">
          Already have an account?{' '}
          <NavLink
            to="/login"
            className="text-[#1A1A1A] hover:text-[#C97B63] transition-colors underline underline-offset-4"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
}