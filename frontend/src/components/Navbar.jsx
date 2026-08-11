import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Labels follow the design spec (Home / Artist / Meetings). "Works" was
// dropped — the home page IS the works listing, so a separate link would
// just point back to the same content.
const NAV_ITEMS = [
  { label: "Artist", to: "/bio" },
  { label: "Meetings", to: "/events" },
];

const navClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-250 ${
    isActive ? "text-gallery-ink" : "text-gallery-inkSoft hover:text-gallery-accentDark"
  }`;

function CartIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart?.items?.length ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-gallery-line bg-gallery-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="font-heading text-xl font-extrabold tracking-tight text-gallery-ink">
          Sahar Alizadeh
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-2">
          <NavLink
            to="/cart"
            aria-label="Cart"
            className={({ isActive }) =>
              `relative grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-250 ${
                isActive
                  ? "border-gallery-accent bg-gallery-accent text-gallery-ink"
                  : "border-gallery-line bg-white text-gallery-ink hover:bg-gallery-accent"
              }`
            }
          >
            <CartIcon />
            {user && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-4 w-4 place-items-center rounded-full bg-gallery-ink text-[10px] leading-none text-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Single account entry point — Login.jsx links to /signup for
              new users, so there's no need for a second nav button. */}
          {user ? (
            <button
              onClick={logout}
              aria-label="Log out"
              className="grid h-10 w-10 place-items-center rounded-xl border border-gallery-line bg-white text-gallery-ink transition-colors duration-250 hover:bg-gallery-accent"
            >
              <LogoutIcon />
            </button>
          ) : (
            <NavLink
              to="/login"
              aria-label="Sign in"
              className={({ isActive }) =>
                `grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-250 ${
                  isActive
                    ? "border-gallery-accent bg-gallery-accent text-gallery-ink"
                    : "border-gallery-line bg-white text-gallery-ink hover:bg-gallery-accent"
                }`
              }
            >
              <UserIcon />
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}