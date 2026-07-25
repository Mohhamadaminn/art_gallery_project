import { useEffect, useState } from "react";
import apiClient from "../api/client";

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Mail(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function Phone(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Instagram(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function MapPin(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArtistProfilePage() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/artists/profile/")
      .then((res) => setArtist(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div className="aspect-[4/5] max-w-md bg-[#EFEDE8] animate-pulse" />
        <div className="space-y-4 pt-2">
          <div className="h-8 w-2/3 bg-[#EFEDE8] animate-pulse" />
          <div className="h-3 w-1/3 bg-[#EFEDE8] animate-pulse" />
          <div className="h-24 w-full bg-[#EFEDE8] animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
        {error || "Profile not found"}
      </div>
    );
  }

  const contacts = [
    artist.email && {
      icon: Mail,
      label: artist.email,
      href: `mailto:${artist.email}`,
    },
    artist.phone && {
      icon: Phone,
      label: artist.phone,
      href: `tel:${artist.phone}`,
    },
    artist.instagram && {
      icon: Instagram,
      label: artist.instagram.replace(/^@/, ""),
      href: `https://instagram.com/${artist.instagram.replace(/^@/, "")}`,
    },
  ].filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
      <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
        {artist.profile_picture ? (
          <img
            src={artist.profile_picture}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8C8C8C] text-xs tracking-[0.15em] uppercase">
            No portrait
          </div>
        )}
      </div>

      <div className="pt-2">
        <h1
          className="text-3xl font-bold mb-2 text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {artist.name}
        </h1>

        {artist.location && (
          <p className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-[#8C8C8C] mb-8">
            <MapPin width={12} height={12} className="text-[#B85C4A]" />
            {artist.location}
          </p>
        )}

        {artist.bio && (
          <p className="text-[#4A4A4A] leading-relaxed whitespace-pre-line mb-10">
            {artist.bio}
          </p>
        )}

        {contacts.length > 0 && (
          <div className="border-t border-[#E3E0D9] pt-6 space-y-3">
            {contacts.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 text-sm text-[#4A4A4A] hover:text-[#B85C4A] transition-colors w-fit"
              >
                <span className="flex items-center justify-center w-7 h-7 border border-[#E3E0D9] text-[#8C8C8C]">
                  <Icon />
                </span>
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistProfilePage;