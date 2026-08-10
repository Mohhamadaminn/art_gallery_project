import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/layout/Container";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password, phoneNumber, age, email);
    navigate("/");
  };

  const inputClass =
    "w-full rounded-xl border border-gallery-line bg-white px-4 py-3 text-gallery-ink placeholder:text-gallery-inkSoft/60 transition-shadow duration-250 focus:outline-none focus:ring-2 focus:ring-gallery-accent/45";

  return (
    <Container>
      <div className="flex justify-center">
        <div className="w-full max-w-sm rounded-2xl bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.15em] text-gallery-accentDark">
              Account
            </p>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-gallery-ink">
              Sign up
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-gallery-inkSoft">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                placeholder="Choose a username"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-gallery-inkSoft">
                Email <span className="normal-case tracking-normal text-gallery-inkSoft/60">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-gallery-inkSoft">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-gallery-inkSoft">
                Phone number
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={inputClass}
                placeholder="Your phone number"
                type="tel"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-gallery-inkSoft">
                Age <span className="normal-case tracking-normal text-gallery-inkSoft/60">(optional)</span>
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={inputClass}
                placeholder="Your age"
                min="1"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-gallery-accent py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 hover:bg-gallery-ink hover:text-white"
            >
              Sign up
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gallery-inkSoft">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-gallery-ink underline underline-offset-4 transition-colors duration-250 hover:text-gallery-accentDark"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </Container>
  );
}