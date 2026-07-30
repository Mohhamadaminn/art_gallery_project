import { Link } from "react-router-dom";

export default function HeroSection({ artist, loading }) {

  if (loading) {
    return (
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-5">
          <div className="h-12 w-64 bg-[#EFEDE8] animate-pulse" />
          <div className="h-5 w-40 bg-[#EFEDE8] animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-[#EFEDE8] animate-pulse" />
            <div className="h-4 w-full bg-[#EFEDE8] animate-pulse" />
            <div className="h-4 w-4/5 bg-[#EFEDE8] animate-pulse" />
          </div>

          <div className="flex gap-4 pt-4">
            <div className="w-36 h-11 bg-[#EFEDE8] animate-pulse" />
            <div className="w-36 h-11 bg-[#EFEDE8] animate-pulse" />
          </div>
        </div>

        <div className="aspect-[4/5] bg-[#EFEDE8] animate-pulse" />
      </section>
    );
  }

  if (!artist) return null;

  return (
    <section className="grid md:grid-cols-2 gap-20 items-center">
      <div>
        <p className="uppercase tracking-[0.25em] text-xs text-[#B85C4A] mb-4">
          Contemporary Artist
        </p>

        <h1
          className="text-5xl leading-tight mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {artist.name}
        </h1>

        <p className="text-[#5A5A5A] leading-8 max-w-xl">
          {artist.bio?.length > 280
            ? artist.bio.substring(0, 280) + "..."
            : artist.bio}
        </p>

        <div className="flex gap-5 mt-10">
          <Link
            to="/works"
            className="px-7 py-3 bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-xs hover:bg-[#333] transition"
          >
            View Gallery
          </Link>

          <Link
            to="/courses"
            className="px-7 py-3 border border-[#1A1A1A] uppercase tracking-[0.15em] text-xs hover:bg-[#1A1A1A] hover:text-white transition"
          >
            Courses
          </Link>
        </div>
      </div>

      <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
        {artist.profile_picture && (
          <img
            src={artist.profile_picture}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
}