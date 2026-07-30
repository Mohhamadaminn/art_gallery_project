import { Link } from "react-router-dom";


export default function AboutPreview({ artist, loading }) {
    
  if (loading) {
    return (
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] bg-[#EFEDE8] animate-pulse" />

        <div className="space-y-5">
          <div className="h-10 w-56 bg-[#EFEDE8] animate-pulse" />

          <div className="space-y-3">
            <div className="h-4 w-full bg-[#EFEDE8] animate-pulse" />
            <div className="h-4 w-full bg-[#EFEDE8] animate-pulse" />
            <div className="h-4 w-3/4 bg-[#EFEDE8] animate-pulse" />
          </div>

          <div className="h-10 w-40 bg-[#EFEDE8] animate-pulse" />
        </div>
      </section>
    );
  }

  if (!artist) return null;

  return (
    <section className="grid md:grid-cols-2 gap-20 items-center">
      <div className="aspect-[4/5] overflow-hidden bg-[#EFEDE8]">
        {artist.profile_picture ? (
          <img
            src={artist.profile_picture}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8C8C8C] uppercase tracking-[0.2em] text-xs">
            No Portrait
          </div>
        )}
      </div>

      <div>
        <p className="uppercase tracking-[0.25em] text-xs text-[#B85C4A] mb-3">
          About
        </p>

        <h2
          className="text-4xl mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Meet the Artist
        </h2>

        <p className="leading-8 text-[#5A5A5A] mb-10">
          {artist.bio?.length > 350
            ? artist.bio.substring(0, 350) + "..."
            : artist.bio}
        </p>

        <div className="space-y-3 mb-10 text-sm text-[#6B6B6B]">
          {artist.location && (
            <p>
              <span className="font-medium text-[#1A1A1A]">Location:</span>{" "}
              {artist.location}
            </p>
          )}

          {artist.email && (
            <p>
              <span className="font-medium text-[#1A1A1A]">Email:</span>{" "}
              {artist.email}
            </p>
          )}

          {artist.phone && (
            <p>
              <span className="font-medium text-[#1A1A1A]">Phone:</span>{" "}
              {artist.phone}
            </p>
          )}
        </div>

        <Link
          to="/bio"
          className="inline-block px-7 py-3 border border-[#1A1A1A] uppercase tracking-[0.15em] text-xs hover:bg-[#1A1A1A] hover:text-white transition"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}