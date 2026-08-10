import { useState } from "react";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/layout/Container";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      const next = searchParams.get("next");
      navigate(next || "/");
    } catch (err) {
      setError("Invalid username or password.");
    }
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
              Log in
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
                placeholder="Your username"
                autoComplete="username"
                required
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
                placeholder="Your password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && <p className="text-xs tracking-[0.05em] text-gallery-accentDark">{error}</p>}

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-gallery-accent py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 hover:bg-gallery-ink hover:text-white"
            >
              Log in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gallery-inkSoft">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-gallery-ink underline underline-offset-4 transition-colors duration-250 hover:text-gallery-accentDark"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </Container>
  );
}