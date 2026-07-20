import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-white">
            Art Gallery
          </div>

          <div className="flex gap-8 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "text-zinc-400 hover:text-white transition-colors"
              }
            >
              Artists
            </NavLink>
            <NavLink
              to="/works"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "text-zinc-400 hover:text-white transition-colors"
              }
            >
              Works
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "text-zinc-400 hover:text-white transition-colors"
              }
            >
              Courses
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}