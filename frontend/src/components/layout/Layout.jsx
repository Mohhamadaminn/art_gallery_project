import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
      <nav className="border-b border-[#EAE8E3]">
        <div className="max-w-6xl mx-auto px-10 py-8 flex items-center justify-between">
          <div
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sahar Alizadeh
          </div>

          <div className="flex gap-10 text-xs tracking-[0.15em] uppercase items-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-[#C97B63]"
                  : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/works"
              className={({ isActive }) =>
                isActive
                  ? "text-[#C97B63]"
                  : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
              }
              >
              Gallery
            </NavLink>
            <NavLink
              to="/bio"
              className={({ isActive }) =>
                isActive
                  ? "text-[#C97B63]"
                  : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
              }
            >
              Bio / CV
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? "text-[#C97B63]"
                  : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-[#C97B63]"
                  : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
              }
            >
              Cart{user && cart.items.length > 0 ? ` (${cart.items.length})` : ""}
            </NavLink>
            {/* Placeholders — not routed yet */}

            {user ? (
              <button
                onClick={logout}
                className="text-xs tracking-[0.15em] uppercase text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
              >
                Log out
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#C97B63]"
                      : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#C97B63]"
                      : "text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-10 py-16">
        <Outlet />
      </main>
    </div>
  );
}