import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navigation = [
  {
    label: "Home",
    to: "/",
    end: true,
  },
  {
    label: "Works",
    to: "/works",
  },
  {
    label: "Events",
    to: "/events",
  },
  {
    label: "Bio",
    to: "/bio",
  },
];

const navClass = ({ isActive }) =>
  isActive
    ? "text-[#C97B63]"
    : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart?.items?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">

      <header className="border-b border-[#EAE8E3] sticky top-0 bg-[#FAFAF8]/90 backdrop-blur z-50">

        <div className="max-w-6xl mx-auto px-10 py-8 flex items-center justify-between">

          <NavLink
            to="/"
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sahar Alizadeh
          </NavLink>

          <nav className="flex items-center gap-10 text-xs uppercase tracking-[0.15em]">

            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/cart"
              className={navClass}
            >
              Cart
              {user && cartCount > 0 && (
                <span className="ml-1 text-[#C97B63]">
                  ({cartCount})
                </span>
              )}
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/orders"
                  className={navClass}
                >
                  Orders
                </NavLink>

                <button
                  onClick={logout}
                  className="text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors bg-transparent border-none p-0 cursor-pointer font-inherit text-xs uppercase tracking-[0.15em]"                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={navClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={navClass}
                >
                  Sign Up
                </NavLink>
              </>
            )}

          </nav>

        </div>

      </header>

      <main className="max-w-6xl mx-auto px-10 py-16">

        <Outlet />

      </main>

    </div>
  );
}