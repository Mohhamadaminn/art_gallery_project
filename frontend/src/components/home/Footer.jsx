import { Link } from "react-router-dom";

const navigation = [
  {
    label: "Home",
    to: "/",
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

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[#EAE8E3]">
      <div className="max-w-6xl mx-auto px-10 py-14">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

          <div>

            <h2
              className="text-2xl mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sahar Alizadeh
            </h2>

            <p className="text-sm text-[#7B7B7B] max-w-sm leading-7">
              Contemporary artist creating original paintings,
              educational courses and artistic events.
            </p>

          </div>

          <nav className="flex flex-wrap gap-8 uppercase tracking-[0.15em] text-xs">

            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[#8C8C8C] hover:text-[#C97B63] transition-colors"
              >
                {item.label}
              </Link>
            ))}

          </nav>

        </div>

        <div className="mt-12 pt-6 border-t border-[#F0EEE9] flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[#9A9A9A]">

          <p>
            © {new Date().getFullYear()} Sahar Alizadeh.
            All rights reserved.
          </p>

          <p>
            Designed & Developed with React & Django
          </p>

        </div>

      </div>
    </footer>
  );
}