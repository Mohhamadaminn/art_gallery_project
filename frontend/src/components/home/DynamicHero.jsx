import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

function getNearestUpcoming(meetings) {
  const now = new Date();
  return meetings
    .filter((m) => m.date_time && new Date(m.date_time) > now)
    .sort((a, b) => new Date(a.date_time) - new Date(b.date_time))[0];
}

export default function DynamicHero() {
  const [meeting, setMeeting] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get("/meetings/"),
      apiClient.get("/artists/profile/"),
    ])
      .then(([meetingsRes, artistRes]) => {
        let data = meetingsRes.data;
        if (data.results) data = data.results;
        if (data.data) data = data.data;

        setMeeting(getNearestUpcoming(Array.isArray(data) ? data : []) || null);
        setArtist(artistRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="aspect-[16/9] bg-[#EFEDE8] animate-pulse" />;
  }

  // Case 1: an upcoming meeting exists — promote it
  if (meeting) {
    return (
      <Link
        to={`/meetings/${meeting.id}`}
        className="group relative block aspect-[4/5] sm:aspect-[16/9] overflow-hidden bg-[#1A1A1A]"
      >
        {meeting.image && (
          <img
            src={meeting.image}
            alt={meeting.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="relative h-full flex flex-col justify-end p-8 sm:p-12 md:p-16 max-w-2xl">
          <span className="inline-block w-fit px-3 py-1 mb-5 text-[10px] uppercase tracking-[0.2em] text-white border border-white/40 backdrop-blur-sm">
            Registration Open
          </span>

          <h1
            className="text-3xl md:text-5xl text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {meeting.title}
          </h1>

          {meeting.description && (
            <p className="text-white/80 leading-7 mb-6 max-w-xl line-clamp-2">
              {meeting.description}
            </p>
          )}

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.1em] text-white/70 mb-8">
            {meeting.date_time && (
              <span>
                {new Date(meeting.date_time).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {meeting.location && <span>{meeting.location}</span>}
          </div>

          <span className="w-fit px-7 py-3 bg-white text-[#1A1A1A] uppercase tracking-[0.15em] text-xs group-hover:bg-[#C97B63] group-hover:text-white transition-colors">
            Register Now
          </span>
        </div>
      </Link>
    );
  }

  // Case 2: no upcoming meetings — fall back to the Artist Hero
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

        <Link
          to="/works"
          className="inline-block mt-10 px-7 py-3 bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-xs hover:bg-[#333] transition"
        >
          View Gallery
        </Link>
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