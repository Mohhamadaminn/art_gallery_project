import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gallery-bg font-body text-gallery-ink">
      <Navbar />
      {/* Full-bleed — pages that need the standard reading width should
          wrap their content in <Container>, so the home page's hero
          slider can go edge-to-edge above the fold. */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}