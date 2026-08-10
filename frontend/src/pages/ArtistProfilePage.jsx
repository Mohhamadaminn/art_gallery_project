import { useEffect, useState } from "react";
import apiClient from "../api/client";
import Container from "../components/layout/Container";

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
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
          <div className="aspect-[4/5] animate-pulse rounded-2xl bg-gallery-line/50 md:col-span-3" />
          <div className="space-y-4 pt-2 md:col-span-2">
            <div className="h-8 w-2/3 animate-pulse rounded-lg bg-gallery-line/50" />
            <div className="h-3 w-1/3 animate-pulse rounded-lg bg-gallery-line/50" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-gallery-line/50" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !artist) {
    return (
      <Container>
        <div className="py-20 text-center text-sm tracking-wide text-gallery-accentDark">
          {error || "Profile not found"}
        </div>
      </Container>
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
    // 3/5 - 2/5 split so the portrait reads as the dominant element,
    // per the editorial-layout brief, instead of an even 50/50 grid.
    <Container>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gallery-line/40 md:col-span-3">
          {artist.profile_picture ? (
            <img
              src={artist.profile_picture}
              alt={artist.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.15em] text-gallery-inkSoft">
              No portrait
            </div>
          )}
        </div>

        <div className="pt-2 md:col-span-2">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gallery-accentDark">
            Contemporary Artist
          </p>

          <h1 className="font-heading mb-2 text-3xl font-extrabold tracking-tight text-gallery-ink">
            {artist.name}
          </h1>

          {artist.location && (
            <p className="mb-10 flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-gallery-inkSoft">
              <MapPin width={12} height={12} className="text-gallery-accentDark" />
              {artist.location}
            </p>
          )}

          {artist.bio && (
            <p className="mb-10 whitespace-pre-line leading-relaxed text-gallery-inkSoft">
              {artist.bio}
            </p>
          )}

          {contacts.length > 0 && (
            <div className="space-y-3 border-t border-gallery-line pt-6">
              {contacts.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex w-fit items-center gap-3 text-sm text-gallery-inkSoft transition-colors duration-250 hover:text-gallery-accentDark"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gallery-line text-gallery-inkSoft">
                    <Icon />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ArtistProfilePage;